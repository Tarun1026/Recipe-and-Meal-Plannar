import React from 'react'
import './SearchBar.css'
import { CiFilter } from "react-icons/ci";

const SearchBar = () => {
  return (
   <>
   <div className='searchDiv'>
    <input
      type='text'
      placeholder='Search your recipe'
      className='searchBar'
    />
    <select className='filter'>
      <option>
        <CiFilter className='filterIcon'/> Filter
      </option>
    </select>
   </div>

   <div className='shareRecipeDiv'>
      <div className='textContainer'>
        <h2 className='add'>Add your own recipe</h2>
        <p className='upload'>Upload your own home-made recipe and share with other members</p>
      </div >
      <img src="https://th.bing.com/th/id/OIP.vGrbHVwayMqf5MNGiF5aKwHaFS?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Recipe" className='img'/>
    </div>
   </>
  )
}

export default SearchBar
