import { useEffect, useState } from "react";
import axios from "axios";

const useMealTypesLink = (dynamicUrl) => {
  const [mealC, setMealC] = useState([]);

  useEffect(() => {
    const fetchMealsTypesData = async () => {
      try {
        let recipesId = [];
        if (dynamicUrl) {
          const res = await axios.get(dynamicUrl);
          recipesId = res.data.results.map((recipe) => recipe.id);
          console.log("id", recipesId);
        } else {
          console.log("No dynamic URL provided.");
        }
        const requests = recipesId.map((id) =>
          axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=87db0a533f81463e979ef6766e426dfa
`
          )
        );

        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data);
        setMealC(data);
      } catch (error) {
        console.error("Error fetching meal types:", error);
      }
    };

    fetchMealsTypesData();
  }, [dynamicUrl]);

  return { mealC };
};

export default useMealTypesLink;
