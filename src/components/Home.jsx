import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import landingImg from '../imgs/landing.png';

import SearchIcon from '@material-ui/icons/Search';
import { Bounce,Zoom} from "react-awesome-reveal";
import {  Services, HowItWorks } from './Components';
import { searchPlaces } from './utils';

import { connect } from 'react-redux';


const Home = ({isAuthenticated})=> {
    const [searchValue,setSearchValue] = useState('');
    const [suggestions,setSuggestions] = useState([]);
    const history = useHistory()

    // for search box, to fetch suggestions
    const handleChange = (e)=> {
        const place = e.target.value;
        setSearchValue(place);

        searchPlaces(place)
        .then (res => {
            setSuggestions(res)
        })
        .catch (err => {
            console.log(err)
        })
    }

    // when the search button is clicked
    const mySubmitHandler = (e)=> {
        e.preventDefault();
        let firstStr = ""
        let finalStr = ""
        searchValue.split(",").map(item => firstStr += item.trim())
        firstStr.split(" ").map(item => finalStr += item.trim())
        history.push(`/items/${finalStr}`)
        
    }

    return (
            <div>
                <div className="landing">
                    <Zoom>
                        <div className="text_part">
                            <h2> Search your doctor here. </h2>
                            <div className="search">
                                <input 
                                className = "formStyle"
                                type="search"
                                value = {searchValue}
                                onChange={handleChange}
                                list="cityname"
                                placeholder = "Search your city. Ex:- Manhattan,New York, USA"
                                required
                                />
                                <datalist id="cityname">
                                    {
                                        suggestions.map((item,index) => {
                                            return(
                                                <option key = {index} value={item.place_name} />
                                            )
                                        })
                                    }
                                </datalist>
                                <button className = "search_btn" 
                                    disabled = {searchValue === ''}
                                    onClick = {mySubmitHandler}>
                                    <SearchIcon />
                                </button>

                            </div>

                        </div>
                    </Zoom>

                    <div className="logo_part">
                        <img src={landingImg} alt="" height= "500px" width = "650px"/>
                    </div>
                </div>
                
                <Services />

                {
                    isAuthenticated ? null :
                    <div>
                        <div style = {{marginTop:"35vh"}}>
                            <Bounce>
                                <h4 className = "testi_heading"> How It Works ?? </h4>
                            </Bounce>
                        </div>
                        <HowItWorks />
                    </div>
                }

            </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated : state.token !== null,
    }
}

export default connect (mapStateToProps,null) (Home);


