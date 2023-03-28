import { useEffect, useState } from 'react'
import "./CardInfo.css"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "./CardInfo.css"
import { ClipLoader } from 'react-spinners';
const CardInfo = () => {

  const {id} = useParams();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null)
  
  const fetchData = async () =>{
    setLoading(true)
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
      console.log(response);
      setData(response.data)
    } catch (error) {
      setError(error.message)
    }
    finally{
      setLoading(false)
  }
}

  useEffect(()=>{
    fetchData();
  }, [])
  
  let name;
  let flag;
  let nativeName;
  let population;
  let region;
  let subRegion;
  let capital;
  let currency;
  let languages;
  let borders =[];

  data.forEach((el) => {
    if (el.ccn3 === id) {
      name = el.name.common;
      flag = el.flags.png;
      nativeName = name;
      population = el.population;
      region = el.region;
      subRegion = el.subregion;
      capital = el.capital;
      languages = el.languages.eng;
      el.borders?.forEach(element => {
        borders.push(element.borders)        
      });

    }
  });
  if (loading) {
    return <div className="Loader"><ClipLoader size={100} color='#36d7b7'/></div>
} else if (error) {
    return <div className="Error"><p className='catchError'>{error}</p></div>
} else{
    return (
    <div className='details'>
      <div className="container">
        <div className="details-content">
          <div className="details-content__top">
            <Link to='/'>
              <Button variant='contained'>
                <ArrowBackIcon />
                Назад
              </Button>
            </Link>
          </div>
              <div className="details-btm">
                <div className="details-flag">
                  <img src={flag} alt="" />
                </div>
                <div className="details-info">
                  <div className="details-info-title">
                      <h2 className='details__title1'>{name}</h2>
                  </div>
                  <div className="details-info-list">
                    <ul className="deatils-list1">
                      <li>Native name: <span className='span-info'>{nativeName}</span></li>
                      <li>Population: <span className='span-info'>{new Intl.NumberFormat().format(population)}</span></li>
                      <li>Region: <span className='span-info'>{region}</span></li>
                    </ul>
                    <ul className="deatils-list2">
                      <li>Sub Region: <span className='span-info'>{subRegion}</span></li>
                      <li>Capital: <span className='span-info'>{capital}</span></li>
                      <li>Languages: <span className='span-info'>{languages}</span></li>
                    </ul>
                  </div>
                  <div className="details-border">
                    <p className='borders'>Border countries: {}</p>
                    <Button />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}
}

export default CardInfo