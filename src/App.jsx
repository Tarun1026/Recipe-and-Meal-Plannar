import { useState } from 'react'
import './App.css'
import HomePage from './Components/Home/HomePage'
import {Routes,Route } from 'react-router-dom';
import Detail from './Components/Details/Detail';
import RecipePage from './Components/recipePage/RecipePage';
import MealsCategory from './Components/recipePage/meals/MealsCategory';
import RecipeDetail from './Components/Details/RecipeDetail';
import { FavouriteContextProvider } from './Components/context/FavourtieRecipeContext';
import Favourites from './Components/FavouritePage/Favourites';
import MealPlannar from './Components/yourMeal/MealPlannar';
import DailyMeals from './Components/yourMeal/DailyMeals';
import { MealPlanProvider } from './Components/context/MealPlanContext';
// import Overview from './Components/OverviewPage/Overview';
function App() {


  return (
    <>
    <MealPlanProvider>
    <FavouriteContextProvider>
       <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/details/nutrients" element={<Detail />} />
          <Route path="/recipeDetails" element={<RecipeDetail />} />
          <Route path="/overview" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/meal" element={<MealPlannar />} />
          <Route path="/meal/day" element={<DailyMeals />} />
          <Route path="/recipe/mealCategory" element={<MealsCategory />} />
       
        </Routes>
        </FavouriteContextProvider>
        </MealPlanProvider>
    </>
  )
}

export default App
