import React from 'react';
import {Zoom, Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import leftImg from '../imgs/doc1.png';
import rightImg from '../imgs/abcd.png';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Slide } from "react-awesome-reveal";

export function Footer(){
    return (
        <Zoom>
            <div className="footer">
                <a href="https://www.freeprivacypolicy.com/live/9056f756-0e8d-44e4-99a9-193ff7d306a7"> Privacy Policy </a>
                <p> abc@gmail.com || Find My Doctor Ⓒ 2021. All Rights Reserved.  </p>
            </div>
        </Zoom>
    )
}

//  for services, below the landing
export const Services = () => {
    return (
        <div className="container">
            <Bounce>
                <h4 className = "testi_heading" style = {{margin:"20vh 0 10vh 0"}}> Who are we ?? </h4>
            </Bounce>

            <div className="about_us">
                <p>
                    According to separate researches conducted by the <b>University of Miami</b>, 
                    <a href="https://news.miami.edu/stories/2020/08/having-a-doctor-who-shares-the-same-race-may-ease-patients-angst.html"> See here </a> 
                    , and the <b>University of Pennsylvania</b>, 
                    <a href="https://www.pennmedicine.org/news/news-releases/2020/november/study-finds-patients-prefer-doctors-who-share-their-same-race-ethnicity"> See here</a>
                    , when doctors are of the same race as their patients, it can forge a sense of comfort that helps to 
                    reduce anxiety and pain, particularly for Black patients. 
                    Hence, based on those findings, the primary purpose of this project is to connect patients with the doctors 
                    who are of the same race/ethnicity or who speak their native languages.
                </p>
            </div>
    </div>
    )
}

export const HowItWorks = () => {
    return (
        <div>
            <div className="container create_listing_room">
                <Slide>
                    <div className="img_part">
                        <img src={leftImg} alt="" height= "300px" width = "300px"/>
                    </div>
                </Slide>

                <Slide direction = "right">
                    <div className="listing_part">
                            <h4> Are you a Doctor or a Medical Person?? </h4>
                            <p> Register with us so that patients can connect with you.  </p>
                            <Link to = '/register' className="btn btn-secondary"> Register <ArrowRightAltIcon fontSize = "large"/> </Link>
                    </div>
                </Slide>
            </div>

            <div className="container create_listing_room">
                <Slide direction = "up" >
                    <div className="listing_part">
                        <h4> Are you not in the state to afford a Doctor?   </h4>
                        <p> Worry not. We have a list of donors that are ready to help you. <br /> 
                            Just search for the donors and contact them.</p>
                        <Link to = '/donors' className="btn btn-secondary">Look For Donors <ArrowRightAltIcon fontSize = "large"/> </Link>
                    </div>
                </Slide >

                <Zoom>
                    <div className="img_part">
                        <img src={rightImg} alt="" height= "300px" width = "300px"/>
                    </div>
                </Zoom>
                
            </div>
        </div>
    )
}


export const Donors = () => {
    return (
        <div className="donors" style = {{
            'height':"80vh",
            'display':'flex',
            'justifyContent':'center',
            'alignItems':'center'
        }}>
            <h3 style = {{'textAlign':'center'}}> List of Donors to be displayed here </h3>
        </div>
    )
}

export const Stories = () => {
    return (
        <div className="stories" style = {{
            'height':"80vh",
            'display':'flex',
            'justifyContent':'center',
            'alignItems':'center'
        }}>
            <h3 style = {{'textAlign':'center'}}> List of Stories to be displayed here </h3>
        </div>
    )
}