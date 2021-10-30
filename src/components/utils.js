import axios from 'axios';

export const searchPlaces = (value) => {
    return new Promise((resolve,reject) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
        const token = `${process.env.REACT_APP_MAPBOX_TOKEN}`;
    
        const fullUrl = url + value + '.json?access_token=' + token;
        axios.get(fullUrl)
        .then((res) => {
             resolve (res.data.features)
        })
        .catch((err)=> {
            reject (err)
        })
    }) 
}

export const specialization = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Dermatology",
    "Diagnostic Radiology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Ophthalmology",
    "Pathology",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Psychiatry",
    "Urology",
    "Urology"
]