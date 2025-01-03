import { useEffect, useState } from 'react';
import axios from 'axios';

const useMealCategoriesLink = () => {
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    const fetchMealsCategoriesData = async () => {
      let url;
    //   if (dynamicUrl) {
    //     url = dynamicUrl;
    //     console.log(url);
    //     const res = await axios.get(url);
    //     console.log("dynamic", res.data.results);
    //     setMeal(res.data.results || []);  
    //   } else {
        url = "https://tarun1026.github.io/RecipeAPI/db.json";
        // console.log("localu", url);
        const res = await axios.get(url);
        // console.log("local", res.data);
        setMeal(res.data.mealCategories);
    //   }
    };
    fetchMealsCategoriesData();
  }, []); 

  return { meal };
};

export default useMealCategoriesLink;
