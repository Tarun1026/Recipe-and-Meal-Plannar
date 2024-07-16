import React from 'react';
import { useFavouriteRecipe } from '../context/FavourtieRecipeContext';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideHomePage/SideBar';
import './Favourites.css';

const Favourites = () => {
  const { favouriteRecipe, removeFavouriteRecipe } = useFavouriteRecipe();
  const navigate = useNavigate();

  const navigateToRecipeDetail = (recipe) => {
    navigate("/recipeDetails", { state: recipe });
  };

  const handleRemoveRecipe = (id) => {
    removeFavouriteRecipe(id);
   alert("Recipe removed Succesfully")
  };

  return (
    <div className="leftDivs">
      <div className="firstDiv">
        <SideBar />
      </div>
      <div className="favourites">
        <h1 className='headings'>Favourite Recipes</h1>
        <div className="recipeGrids">
          {favouriteRecipe.length === 0 ? (
            <p>No favourite recipes yet.</p>
          ) : (
            favouriteRecipe.map((recipe) => (
              <div key={recipe.id} className="recipeCard">
                <div className="removeIcon" onClick={() => handleRemoveRecipe(recipe.id)}>
                  &#x2715;
                </div>
                <div className="clickableArea" onClick={() => navigateToRecipeDetail(recipe)}>
                  <img src={recipe.image} alt={recipe.title} className="recipeImg2" />
                  <h2 className="recipeTitle">{recipe.title}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
