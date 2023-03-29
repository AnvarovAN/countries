import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom";
import "./CardInfo.css"
import { ClipLoader } from 'react-spinners';
const CardInfo = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null)
  const [info, setInfo] = useState([]);


  const { id } = useParams();


  const fetchData = async () => {
    setLoad(true)
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
      setInfo(response.data)
    } catch (error) {
      setError(error.message)
    }
    finally {
      setLoad(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);


  if (load) {
    return <div className="Loader"><ClipLoader size={100} color='#36d7b7' /></div>
  } else if (error) {
    return <div className="Error"><p className='catchError'>{error}</p></div>
  } else {
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
            {
              info.map((el) => (
                <div className="details-btm">
                  <div className="details-flag">
                    <img className="details-flag-img" src={el.flags.png} alt="" />
                  </div>
                  <div className="details-info">
                    <div className="details-info-title">
                      <h2 className='details__title1'>{el.name.common}</h2>
                    </div>
                    <div className="details-info-list">
                      <ul className="deatils-list1">
                        <li>Native name: <span className='span-info'>{el.name.official}</span></li>
                        <li>Population: <span className='span-info'>{new Intl.NumberFormat().format(el.population)}</span></li>
                        <li>Region: <span className='span-info'>{el.region}</span></li>
                      </ul>
                      <ul className="deatils-list2">
                        <li>Sub Region: <span className='span-info'>{el.subregion}</span></li>
                        <li>Capital: <span className='span-info'>{el.capital}</span></li>
                        <li className="languages">Languages:<span className='span-info'> {Object.values(el.languages)[0]}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CardInfo