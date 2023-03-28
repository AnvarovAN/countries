import React, { useState, useEffect, useRef } from 'react'
import { ALL } from '../../constants/api';
import axios from 'axios';
import "./Card.css"
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
// import CircularProgress from '@mui/material/CircularProgress';
const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const inputValue = useRef();
    const regionRef = useRef();
    const [error, setError] = useState(null)
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${ALL}/all`);
            setData(response.data);
            // console.log(response.message);
            setLoading(false)
        } catch (error) {
            // console.log(error.message);
            setError(error.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const filterRegion = async (regionName) => {
        if (regionName === "All") {
          try {
              fetchData();
          } catch (error) {
              setError(error.message)
          }
                  
          }
          else{

              try {
                  const res = await axios.get(`${ALL}/region/${regionName}`);
                  setData(res.data);
                  setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError(false);
                }
        }
      };
    const searchCountries = ()=>{
            const name = inputValue.current.value;

            if(name.trim()){
                
                    const fetchSearch = async ()=>{
                        const response = await axios.get(`${ALL}/name/${name}`)
                        setData(response.data)
                    }
                    try {
                        fetchSearch()
                    } catch (error) {
                        setError(error.message)
                    }
            } else{
                fetchData()
            }
    }
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) {
        return <div className="Loader"><ClipLoader size={100} color='#36d7b7' /></div>
    } else if (error) {
        return <div className="Error"><p className='catchError'>{error}</p></div>
    } else{
        return (
            <div className="card">
            <div className="card-top">
                <input  className='input-search' ref={inputValue} type="text" placeholder='Enter a country ...' onChange={searchCountries} />
                
                <Filter onSelect={filterRegion}/>
            </div>
            <div className='card-btm'>
                {data.map((item) => (
                    <Link to={`/info/${item.ccn3}`}>
                    <div key={item.ccn3} className="card-content">
                        <div className="card-content__flag">
                            <img className='card-img' src={item.flags.png} alt="flag" />
                        </div>
                        <div className="card-info">
                            <h3 className='card-content__name'>
                                {item.name.common}
                            </h3>
                            <p className='card-content__capital'>
                                Capital: {item.capital}
                            </p>
                            <p className='card-content__popualtion'>
                                Population: {new Intl.NumberFormat().format(item.population)}
                            </p>
                            <p className='card-content__region'>
                                Region: {item.region}
                            </p>
                        </div>
                    </div>
                    </Link>
                ))
                }

            </div>
        </div>
    )
}
}

export default Card