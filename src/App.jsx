import { useState } from 'react'
import './App.css'
import HomePage from './Components/Home/HomePage'
import {Routes,Route } from 'react-router-dom';
import Detail from './Components/Details/Detail';
import RecipePage from './Components/recipePage/RecipePage';
import MealsCategory from './Components/recipePage/meals/MealsCategory';
import RecipeDetail from './Components/Details/RecipeDetail';
// import Overview from './Components/OverviewPage/Overview';
function App() {


  return (
    <>
       <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/details/nutrients" element={<Detail />} />
          <Route path="/recipeDetails" element={<RecipeDetail />} />
          <Route path="/overview" element={<HomePage />} />
       
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipe/mealCategory" element={<MealsCategory />} />
       
        </Routes>

    </>
  )
}

export default App
