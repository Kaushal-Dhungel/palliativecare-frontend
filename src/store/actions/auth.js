import axios from 'axios';
import * as actions from './actionCreators';


//-------------- action creators ----------------------------
export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actions.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

// registration error
export const removeError = () => {
    return {
        type : actions.CLEAR_ERROR
    }
}

export const hideModal = () => {
    return {
        type: actions.CLOSE_MODAL
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refresh_token');
    return {
        type: actions.AUTH_LOGOUT
    };
}


// ------- these are the functions that invoke/dispatch action creators which in turn update the state --------------------
//  they themselves aren't the action creator but they call action creators to update the state

const repeatedFunc = res => {
    return dispatch => {    
        const expires = 10800;  // access token expires in every 3 hours
        const token = res.data.access;
        const refresh = res.data.refresh ? res.data.refresh : localStorage.getItem('refresh')
        const expirationDate = new Date(new Date().getTime() + expires * 1000);  // expiration date of refresh token
        localStorage.setItem('token', res.data.access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token)); // call the action creator which updates the state
        dispatch(checkAuthTimeout(expires));
    }
}

// once the access_token expires relogin using the refresh token
const reLogin = () => {
    return dispatch => 
        { 
            const refresh = localStorage.getItem('refresh_token')
            const header = {
                "Content-Type" : "application/json",
                refresh,
            }
            axios.post( `${process.env.REACT_APP_HEROKU_URL}/api/token/refresh`, header)
            .then(res => {
                dispatch(repeatedFunc(res));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
        }
}

// set time-interval for relogin
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(reLogin());
        }, 10800 * 1000)  // relogin after every 10800 second
    }
}

// for login
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${process.env.REACT_APP_HEROKU_URL}/api/token/`, {
            "Content-Type" : "application/json",
            username: username,
            password: password,
        })
        .then(res => {
            dispatch(repeatedFunc(res));
        })
        .catch(err => {
            const msg = err.response.data
            dispatch(authFail(`Login Failed. ${msg.error_description}`))
        })
    }
}

// for signup
export const authSignup = (username, email, password1,password2) => {
    return dispatch => {

        dispatch(authStart());
        axios.post(`${process.env.REACT_APP_HEROKU_URL}/core/registeruser/`, {
                username: username,
                email: email,
                password1: password1,
                password2: password2,   
            })
            .then(res => {
                dispatch(repeatedFunc(res));
                
            })
            .catch(err => {
                dispatch(authFail(err.response.data))
            })
    }
}

// used when the page renders for the first time to check weather the token has expired or not
// if expired then relogin is done else 
// new timeout is set for relogin
export const authCheckState = () => {
    return dispatch => {
        const refresh_token = localStorage.getItem('refresh');
        const token = localStorage.getItem('access');
        if (refresh_token !== null){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(reLogin());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000)) ;
            }
        }
    }
}
