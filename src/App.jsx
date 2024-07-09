import { useState } from 'react'
import './App.css'
import HomePage from './Components/Home/HomePage'
import {Routes,Route } from 'react-router-dom';
import Detail from './Components/Details/Detail';
function App() {


  return (
    <>
       <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/details/nutrients" element={<Detail />} />
       
        </Routes>

    </>
  )
}

export default App
