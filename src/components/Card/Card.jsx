import React, {useState, useContext } from 'react'
import { ContextApi } from '../../context/Context';
import "./Card.css"
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
// import CircularProgress from '@mui/material/CircularProgress';
const Card = () => {
    const { states, api, filterRegion } = useContext(ContextApi)
    const [searchTitle, setSearchTitle] = useState('');
    filterRegion()
    const filteredData = api.data.filter((value) => {
        
        if (searchTitle === '') {
            return value;
        } else if(value.name.common.toLowerCase().includes(searchTitle.toLowerCase())){
            return value.name.common
        }
    })

    if (states.load) {
        return <div className="Loader"><ClipLoader size={100} color='#36d7b7' /></div>
    } else if (states.error) {
        return <div className="Error"><p className='catchError'>{states.error}</p></div>
    } else{
        return (
            <div className="card">
            <div className="card-top">
                <input  className='input-search'  type="text" placeholder='Enter a country ...' onChange={(e) => setSearchTitle(e.target.value)}/>
                
                <Filter onSelect={filterRegion}/>
            </div>
            <div className='card-btm'>
                {filteredData.map((item) => (
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