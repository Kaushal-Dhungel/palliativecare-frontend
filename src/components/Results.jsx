import React from 'react';
import {Link} from "react-router-dom";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ProfileImg from '../imgs/doc1.png';
import SchoolIcon from '@material-ui/icons/School';

const Cards = ({item}) => {
    return (
        <div className="outer">
            <div className="horizontal_card">
                <div className="card_left">
                    <img src={item.avatar} alt=".." />
                </div>
                <div className="card_right">
                    <h3> {item.first_name} {item.last_name} </h3>
                    <p> <i> {item.title} </i></p>
                    <p> <SchoolIcon /> {item.education} </p>
                    <p> <LocationOnIcon /> {item.location} </p>
                    
                    <Link to = {`/docprofile/${item.slug}`}>
                        <p style = {{margin:"0 0 0 3%"}}> Visit Profile </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Results = ({items}) => {
    return (
        <div className = "results">
        {
            items.length === 0 ?
                <h2 style = {{'textAlign':'center'}}> No items present </h2>
                
            :
            items.map((item,index) => {
                return (
                    <Cards item = {item} key = {index}/>
                )
            })
        }
    </div>
    )    
}

export default Results;