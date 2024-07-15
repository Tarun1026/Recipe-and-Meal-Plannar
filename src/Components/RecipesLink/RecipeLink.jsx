import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeLink = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        let url = "";
        let recipeIds = [];
        if (query) {
          url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b176924bdeac4b91bbf27efeec163bcb

`;
          const response = await axios.get(url);
          recipeIds = response.data.results.map((recipe) => recipe.id);
        } else {
          recipeIds = [479182, 479042, 479068, 479046, 479081, 642583];
        }

        const requests = recipeIds.map((id) =>
          axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=b176924bdeac4b91bbf27efeec163bcb

`)
        );
        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data);
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipesData();
  }, [query]);

  return { recipes, error };
};

export default RecipeLink;
