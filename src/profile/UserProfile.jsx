import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

import { Default } from "react-spinners-css";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import swal from 'sweetalert';

import { useHistory } from "react-router-dom";
import * as actions from '../store/actions/auth';

import ReactMapGL ,{ Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import LocationOnIcon from '@material-ui/icons/LocationOn';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const UserProfilee = ({ isAuthenticated, onAuthLogout }) => {
  const [item, setItem] = useState({});
  const [fetching, setFetching] = useState(true);
  const history = useHistory();

  // setting some default value 
  const [viewport, setViewport] = useState({    
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const token = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

  useEffect(() => {

    // when page is rendered fetch items
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
          const res = await axios.get(
            `${process.env.REACT_APP_HEROKU_URL}/profile/`,
            config
          );
          setItem(res.data);
          setViewport((prevValue)=> {
            return {
                ...prevValue,
                latitude:res.data.longitude !== ""? parseFloat(res.data.longitude):37.7577,
                longitude:res.data.latitude !== ""? parseFloat(res.data.latitude):-122.4376,
            }
         })
          setFetching(false);
        } 
        catch (error) {
          console.log(error)
          setFetching(false);
      }
    };

    fetchData();
  }, []);

  // as the name suggests..
  const logoutFunc = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to log out?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willLogOut => {
      if (willLogOut) {
        swal("Logged Out!", "You have been logged out!", "success")
        .then(okay => {
          onAuthLogout();
          history.push('/');
        })
      }
    })
}

  return (
    <div>
      {
        isAuthenticated !== true ?
          <Redirect to = "/"/>
        :
        <div>
          {
            fetching ? 
              <div className="loading_loading">
                <Default color="#343a40" size={150} />
              </div>
            : 
            <div>
              { item === undefined ?
                <h2> Loading </h2>
                :
                <div>
                  {item.phone ? null :

                    <div className="container" style = {{marginTop : "10vh"}}>
                      <div className="roomie_link_wrapper">
                          <div className="box-element">
                              <h5> PLease update your profile to provide some required informations .</h5>
                              <Link to = {`/profile/edit`} className = "btn btn-primary" > Update Profile </Link>
                          </div>
                      </div>
                    </div>

                  }
                  <div className="container ">
                    <div className="row py-5 px-2">
                      <div className="col-md-12 mx-auto">
                        <div className="bg-white shadow rounded overflow-hidden">
                          <div className="px-4 pt-0 pb-4 cover">
                            <div className="media profile-head">
                              <div className="profile">
                                <img
                                  src={`${item.avatar}`}
                                  alt="..."

                                  className="rounded mb-2 img-thumbnail"
                                />
                                <div className="btnssss" style = {{display:"flex",gap:"1rem"}}>
                                  <Link
                                    to="/profile/edit"
                                    className="btn btn-outline-dark "
                                  > Edit profile</Link>

                                  <button className="btn btn-outline-dark " onClick = {logoutFunc}> Logout </button>

                                </div>
                              </div>

                              <div className="media-body text-white">
                                <h4 className="mt-5 mb-0">
                                  {item.first_name && item.last_name
                                    ? `${item.first_name} ${item.last_name}`
                                    : item.get_username}
                                </h4>

                                <p className="small">
                                  <i className="fas fa-map-marker-alt mr-2">{item.title}</i>
                                </p>

                              </div>
                            </div>
                          </div>

                          {/* do not remove this div */}
                          <div className="bg-light p-4 d-flex justify-content-end text-center"></div>

                          <div className="px-4 my-5">
                            <h5 className="mb-0">Contacts</h5>

                            <div className="py-4 rounded shadow-sm bg-light">
                              <span className="contact_info">
                                <PhoneIcon
                                  fontSize="large"
                                  style={{ color: "#d8223b" }}
                                />
                                <p >
                                  - {item.phone ? item.phone : `not provided`}
                                </p>
                              </span>

                              <span className="contact_info">
                                <EmailIcon
                                  fontSize="large"
                                  style={{ color: "#d8223b" }}
                                />
                                <p className = "profile_email"> - {item.email} </p>
                              </span>

                              <span className="contact_info_social">
                                <a href={ item.facebook_link ? item.facebook_link : `#`}>
                                  <FacebookIcon
                                    fontSize="large"
                                    style={{ color: "#d8223b" }}
                                  />
                                </a>

                                <a href={item.twitter_link ? item.twitter_link : `#`}>
                                  <TwitterIcon
                                    fontSize="large"
                                    style={{ color: "#d8223b" }}
                                  />
                                </a>

                                <a href={item.instagram_link ? item.instagram_link : "#"}>
                                  <InstagramIcon
                                    fontSize="large"
                                    style={{ color: "#d8223b" }}
                                  />
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
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps =(dispatch) => {
  return {
      onAuthLogout: () => dispatch(actions.logout()),
      
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfilee);

export default UserProfile;
