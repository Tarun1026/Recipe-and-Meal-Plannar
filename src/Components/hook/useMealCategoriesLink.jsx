import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useMealCategoriesLink = () => {

    const[meal,setMeal]=useState([])

    useEffect(()=>{

        const fetchMealsCategoriesData=async()=>{

            const res = await axios.get("http://localhost:3000/mealCategories")
            setMeal(res.data);
        }
        fetchMealsCategoriesData();
    })
  return {meal}
}

export default useMealCategoriesLink
