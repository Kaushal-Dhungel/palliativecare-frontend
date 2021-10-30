import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import AutoStoriesIcon from '@material-ui/icons/AutoStories';
// import HistoryEduIcon from '@material-ui/icons/HistoryEdu';
import CreateIcon from '@material-ui/icons/Create';
import logoImg from '../imgs/cancer_logo.png';

import { Flip } from "react-awesome-reveal";


const MainNav = ({isAuthenticated}) => {

    const navStyle = {
        color:"black",
        display:"flex",
        gap:"0.5rem"
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" exact to="/">
                    <Flip>
                        <img src={logoImg} alt="" height= "50px" width = "50px" />
                    </Flip>
                </NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto mr-5">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/"
                            activeStyle={navStyle}
                            >
                            Home 
                            <HomeIcon  
                                style = {{ fontSize : "30px"}}
                                />
                            <span className="sr-only">(current)</span></NavLink>
                        </li>

                        <li className="nav-item ">
                            <NavLink className="nav-link" exact to="/donors"
                            activeStyle={navStyle}
                            >Donors
                                <MonetizationOnIcon  
                                style = {{ fontSize : "30px"}}
                                />
                            </NavLink>
                        </li>

                        <li className="nav-item ">
                            <NavLink className="nav-link" exact to="/stories"
                            activeStyle={navStyle}
                            >Stories
                                <CreateIcon  
                                style = {{ fontSize : "30px"}}
                                />
                            </NavLink>
                        </li>

                        {
                            isAuthenticated?
                            
                                <li className="nav-item ">
                                    <NavLink className="nav-link" exact to="/profile"
                                    activeStyle={navStyle}
                                    >Profile
                                        <PersonIcon  
                                        style = {{ fontSize : "30px"}}
                                        />
                                    </NavLink>
                                </li>
                            :
                                <li className="nav-item ">
                                    <NavLink className="nav-link" exact to="/register"
                                    activeStyle={navStyle}
                                    >Register
                                        <LockOpenIcon  
                                        style = {{ fontSize : "30px"}}
                                        />
                                    </NavLink>
                                </li>     
                        }
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated : state.token !== null,
    }
}

export default connect (mapStateToProps,null) (MainNav);