import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeLink = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const recipeIds = [479041, 479042,479068,479046,479081];

    useEffect(() => {
        const fetchRecipesData = async () => {
            try {
                const requests = recipeIds.map(id =>
                    axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=b176924bdeac4b91bbf27efeec163bcb`)
                );
                const responses = await Promise.all(requests);
                const data = responses.map(response => response.data);
                setRecipes(data); 
            } catch (err) {
                setError(err.message);
            }
        };
        fetchRecipesData();
    }, []);

    return { recipes, error };
}

export default RecipeLink;


// 