import axios from 'axios';

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


export const logOutFunc = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("access_expires")
    localStorage.removeItem("refresh_expires")
    // window.location.reload();
    window.location.href = '/'

}

// check wheather the tokens have expired

export const checkState = () => {

    const accessExpires = localStorage.getItem('access_expires');
    const refreshExpires = localStorage.getItem('refresh_expires');

    // if both are null, could be the first time loading the page, could've erased the data 
    if(accessExpires === refreshExpires|| accessExpires === null) {
        return;
    }

    // has refresh token expired??
    if (refreshExpires <= new Date()) {
        logOutFunc();
        return;
    }

    // has acces token expired??
    if (accessExpires <= new Date()) {
        repeatLogin();
    } 
    
    // none of them has expired
    const date = new Date();
    const access_expires = (new Date(accessExpires) - date)/1000;  // dividing by 1000 give difference in seconds, by 60000 gives in minutes
    const refresh_expires = (new Date(refreshExpires) - date)/1000;
    timeOutFunction(access_expires,refresh_expires)

}

// 
const timeOutFunction = (time1, time2) => {
    
    // refresh token eery 4 hours
    setTimeout(() => {
        repeatLogin();
    }, time1 * 1000)

    // logout after a day
    setTimeout(() => {
        logOutFunc();
    }, time2 * 1000)
}

// re login after the access token has expired
const repeatLogin = () => {
    const refresh = localStorage.getItem('refresh');
    const refreshExpires = localStorage.getItem('refresh_expires');

    //logged out, could be due to expiration of refresh token
    if (refresh === null || refresh === undefined)
        return
    
    const header = {
        "Content-Type" : "application/json",
        refresh,
    }

    axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,header)
    .then (res => {
        localStorage.setItem('access',res.data.access)
        const access_expires = new Date();
        access_expires.setHours(access_expires.getHours() + 1 ) // 1 hours added
        localStorage.setItem('access_expires',access_expires);  

        // idk why these values are getting erased all the time, so hardcoded them to save
        localStorage.setItem('refresh',refresh)
        localStorage.setItem('refresh_expires',refreshExpires)

        setTimeout( () => {
            repeatLogin();
        },3600*1000) // repeat login every hour
    })

    .catch(err => {
        setTimeout( () => {
            repeatLogin();
        },10*1000)  // if error, try login each 10 second
    })
}

const repeatedFunction = (data) => {
    localStorage.setItem('access',data.access)
    localStorage.setItem('refresh',data.refresh)
    const access_expires = new Date();
    const refresh_expires = new Date();

    // access_expires.setMinutes(access_expires.getMinutes() + 5 ) // 5 minutes added
    // refresh_expires.setHours(refresh_expires.getHours() + 24) // 24 hours added
    // timeOutFunction(300,86400)

    access_expires.setHours(access_expires.getHours() + 1 ) // 1 hours added
    refresh_expires.setHours(refresh_expires.getHours() + 48) // 48 hours added
    timeOutFunction(3600,172800)  // 1 hrs and 2 days in seconds

    localStorage.setItem('access_expires',access_expires);  
    localStorage.setItem('refresh_expires',refresh_expires); 
}

export function registerFn (form) {
    return new Promise((resolve,reject) => {

        axios.post(`${process.env.REACT_APP_URL}/back/register`,form)
        .then (res => {
            console.log(res.data)
            repeatedFunction(res.data);
            resolve("success");
        })
    
        .catch(err => {
            reject(err)
        })
    })
}

export function loginFn (username,password){
    return new Promise ((resolve,reject) => {
        const header = {
                "Content-Type" : "application/json",
                username,
                password
        }
        
        
        axios.post(`${process.env.REACT_APP_URL}/api/token/`,header)
        .then (res => {
            repeatedFunction(res.data);
            resolve("success");
        })

        .catch(err => {
            reject(err);
        })
    })
}
