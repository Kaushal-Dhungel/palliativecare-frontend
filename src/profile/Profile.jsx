import React, { useState,useEffect } from 'react';
import axios from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

import { Default } from 'react-spinners-css';

import ReactMapGL ,{ Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import LocationOnIcon from '@material-ui/icons/LocationOn';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Profile = (props)=> {

    const[item,setItem] = useState({});
    const[fetching,setFetching] = useState(true)

      // setting some default value 
    const [viewport, setViewport] = useState({    
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    const token = `${process.env.REACT_APP_MAPBOX_TOKEN}`;
    const slug = props.match.params.id 

    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_HEROKU_URL}/profile/docprofile/${slug}/`);
                setItem(res.data);
                setViewport((prevValue)=> {
                    return {
                        ...prevValue,
                        latitude:res.data.longitude !== ""? parseFloat(res.data.longitude):37.7577,
                        longitude:res.data.latitude !== ""? parseFloat(res.data.latitude):-122.4376,
                    }
                })
                setFetching(false);
  
            } catch (error) {
                setFetching(false);
            }
        }
  
        fetchData();
    },[slug]);


    return (
        <div>
            {
                fetching ? 
                <div className="loading_loading">
                    <Default color = "#343a40" size = {150} />
                </div>
                :
                <div>
                    {
                        item === undefined ?
                        <h2> Loading </h2>
                        :
                        <div>
                            <div className="container">
                                <div className="row py-5 px-4">
                                    <div className="col-md-12 mx-auto">
                                        <div className="bg-white shadow rounded overflow-hidden">
                                            
                                            <div className="px-4 pt-0 pb-4 cover">
                                                <div className="media profile-head">
                                                    <div className="profile mr-3">
                                                        <img src={`${item.avatar}`} alt="..." width="180" className="rounded mb-5 img-thumbnail"/>
                                                        </div>
                                                    <div className="media-body text-white">
                                                        <h4 className="mt-5 mb-0"> 
                                                        {
                                                            item.first_name && item.last_name? `${item.first_name} ${item.last_name}`: 
                                                            item.get_username
                                                        } 
                                                        
                                                        </h4>
                                                        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{item.title}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* do not remove this div */}
                                            <div className="bg-light p-4 d-flex justify-content-end text-center"></div>

                                            <div className="px-4 my-3">
                                                <h5 className="mb-0">Contact</h5>
                                                <div className="py-4 rounded shadow-sm bg-light">
                                                    <span className = "contact_info">
                                                        <PhoneIcon fontSize="large" style={{ color: '#d8223b' }} /> 
                                                        <p> - {item.phone? item.phone : `not provided`} </p>
                                                    </span>

                                                    <span className = "contact_info">
                                                        <EmailIcon fontSize="large" style={{ color: '#d8223b' }} /> 
                                                        <p className = "profile_email"> - {item.email} </p>
                                                    </span>

                                                    <span className="contact_info_social">
                                                        <a href = {item.facebook_link? item.facebook_link : `#`} > 
                                                        <FacebookIcon fontSize="large" style={{ color: '#d8223b', }} />
                                                        </a>

                                                        <a href = {item.twitter_link? item.twitter_link : `#`} > 
                                                        <TwitterIcon fontSize="large" style={{ color: '#d8223b', }} />
                                                        </a>

                                                        <a href = {item.instagram_link? item.instagram_link : '#'} > 
                                                        <InstagramIcon fontSize="large" style={{ color: '#d8223b', }}/>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="doctor_info_wrapper">
                                                <details>
                                                    <summary>
                                                        Want to Know More?? (Click Here)
                                                    </summary>
                                                    <div className="doc_info rounded shadow-sm">
                                                        <p className = "doc_details"> <b>Clinic/Hospital:-</b> {item.clinic_name} </p>
                                                        <p className = "doc_details"> <b>Education:-</b> {item.education} </p>
                                                        <p className = "doc_details"> <b>Working Hours:-</b> {item.working_hours} </p>
                                                        <p className = "doc_details"> <b>Gender Identity:-</b> {item.identity} </p>
                                                        <p className = "doc_details"> <b>Languages:-</b> {item.languages} </p>
                                                        <p className = "doc_details"> <b>Ethnicity:-</b> {item.ethnicity} </p>
                                                        <p className = "doc_details"> <b>Religion:-</b> {item.religion} </p>
                                                        <p className = "doc_details"> <b>Native Country:-</b> {item.native_country} </p>
                                                    </div>
                                                </details>
                                            
                                            </div>

                                            <div className="map_location">
                                                <ReactMapGL
                                                    {...viewport}
                                                    mapboxApiAccessToken = {token}
                                                    width = "290px"
                                                    height = "300px"
                                                    mapStyle = 'mapbox://styles/kaushal023/cklgwa17c009a18rxu3mdies2'
                                                    onViewportChange={(viewport) => setViewport(viewport)}
                                                    >
                                                        <Marker
                                                        longitude = {viewport.longitude}
                                                        latitude = {viewport.latitude}
                                                        >
                                                        <LocationOnIcon
                                                        style = {{fontSize: 40 }}
                                                        color="secondary"
                                                        />
                                                        </Marker>
                                                </ReactMapGL>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default Profile;