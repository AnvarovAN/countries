import './App.css';
import { Routes, Route } from 'react-router-dom';
import Card from './components/Card/Card';
import CardInfo from "./components/CardInfo/CardInfo"



function App() {
  return (
    <>
    <div className="header">
      <div className="container">
        <h4 className='header__title'>Where in the world</h4>
      </div>
    </div>
    <div className="container">
      <Routes>
        <Route path='/' element={<Card/>}/>
        <Route path='/info/:id' element={<CardInfo/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
