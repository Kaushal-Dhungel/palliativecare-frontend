import React, {useState, useEffect} from 'react';
import Results from './Results';
import axios from 'axios';
import { Default } from 'react-spinners-css';
import { specialization } from "./utils";

const Item = (props) => {

    const location = props.match.params.id 
    let firstStr = ""
    let finalStr = ""
    location.split(",").map(item => firstStr += item.trim())
    firstStr.split(" ").map(item => finalStr += item.trim())

    const[items,setItems] = useState([]);
    const[fetching,setFetching] = useState(true)
    const[filters,setFilters] = useState({
        identity:"",
        religion:"",
        ethnicity:"",
        language:"",
        title:""
    })

    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_HEROKU_URL}/profile/search/${location}/`,{
                    params: {
                        identity:"",
                        religion:"",
                        ethnicity:"",
                        language:"",
                        title:""
                    }
                  });
                setItems(res.data);
                setFetching(false)
  
            } catch (error) {
            setFetching(false)
            }
        }
  
        fetchData();
    },[location]);

    const filter = async() => {
        setFetching(true)
        console.log(filters)

        await axios.get(`${process.env.REACT_APP_HEROKU_URL}/profile/search/${location}/`,{
            params: filters
          })
        
        .then(res => {
            setItems(res.data);
            console.log("filered")
            console.log(res.data)
            setFetching(false)
        })

        .catch(err => {
            console.log(err)
            setFetching(false)
        })
    }

    const clearFilter = () => {

        setFilters((prevVal) => {
            return {
                identity:"",
                religion:"",
                ethnicity:"",
                language:"",
                title:""
            }
        })

        filter();

    }
    

    const changeFn = (e) => {
        const { name, value } = e.target;

        setFilters((intialState) => {
          return {
            ...intialState,
            [name]: value,
          }
        })
    }

    
    return (
        <div>

            <div className="search_result">
                <div className="filters">
                    {/* <h3 className = "testi_heading"> Filters </h3> */}
                    <details>
                        <summary>
                            Apply Filters?? (Click Here)
                        </summary>
                        <div className="filter_section">
                            <span>
                                <p> Filter by gender Identity</p>
                                <input name="identity" className="formStyle" type="text" list = "genders"
                                    value={filters.identity} onChange={changeFn} placeholder="Example: LGBTQ+"autoComplete="off"/>

                                    <datalist id="genders">
                                        <option value= 'Male'/>
                                        <option value= 'Female'/>
                                        <option value= 'LGBTQ+'/>
                                    </datalist>
                            </span>

                            <span>
                                <p> Filter by Ethnicity</p>
                                <input name="ethnicity" className="formStyle" type="text" list = "ethnicity"
                                    value={filters.ethnicity} onChange={changeFn} placeholder="Example: African"autoComplete="off"/>

                                    <datalist id="ethnicity">
                                        <option value= 'Asian'/>
                                        <option value= 'South Asian'/>
                                        <option value= 'African'/>
                                        <option value= 'American Biracial'/>
                                        <option value= 'White'/>
                                        <option value= 'Jew'/>
                                        <option value= 'Arab'/>
                                    </datalist> 
                            </span>        

                            <span>
                                <p> Filter by Specialization </p>
                                    <input name="title" className="formStyle" type="text" list = "titles"
                                    value={filters.title} onChange={changeFn} placeholder="Example: Obstetrics and Gynecology" autoComplete="off"/>
                                    <datalist id="titles">
                                        {
                                        specialization.map((item,index) => {
                                            return (
                                            <option key = {index} value= {item}/>
                                            )
                                        })
                                        }
                                    </datalist>
                            </span>
                            <span>
                                <p> Filter by Religion</p>
                                <input name="religion" className="formStyle" type="text"
                                value={filters.religion} onChange={changeFn} placeholder="Example: Hindu" autoComplete="off"/>
                            </span>

                            <span>
                                <p> Filter by Language</p>
                                <input name="language" className="formStyle" type="text"
                                value={filters.language} onChange={changeFn} placeholder="Example: Nepali" autoComplete="off"/>
                            </span>

                            <span className="filter_button">
                                <button className = "btn btn-primary ml-2" onClick= {filter}>Apply</button>
                                <button className = "btn btn-secondary ml-2" onClick = {clearFilter}>Clear All</button>
                            </span>

                        </div>
                    </details>
                </div>

                <div className="results_wrapper">
                    <h3 className = "testi_heading"> Results </h3>
                    {
                        fetching ? 
                        <div className="loading_loading">
                            <Default color = "#343a40" size = {150} />
                        </div>
                        :
                        <Results items = {items} />
                    }
                </div>

            </div>

        </div>
    )
}

export default Item;