import { useState } from 'react'
import './App.css'
import HomePage from './Components/Home/HomePage'
import {Routes,Route } from 'react-router-dom';
import Detail from './Components/Details/Detail';
import RecipePage from './Components/recipePage/RecipePage';
// import Overview from './Components/OverviewPage/Overview';
function App() {


  return (
    <>
       <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/details/nutrients" element={<Detail />} />
          <Route path="/overview" element={<HomePage />} />
       
          <Route path="/recipe" element={<RecipePage />} />
       
        </Routes>

    </>
  )
}

export default App
