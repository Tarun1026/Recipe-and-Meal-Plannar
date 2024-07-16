import React, { createContext, useContext, useState } from 'react';

const FavouriteContext = createContext();

export const useFavouriteRecipe = () => {
  return useContext(FavouriteContext);
}

export const FavouriteContextProvider = ({ children }) => {
  const [favouriteRecipe, setFavouriteRecipe] = useState(() => {
    const storedFavourites = localStorage.getItem('favouriteRecipes');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const addFavouriteRecipe = (recipe) => {
    const isDuplicate = favouriteRecipe.some((m) => m.id === recipe.id);
    if (isDuplicate) {
      alert("This Recipe is already in your Favourites");
      return;
    }

    setFavouriteRecipe((prevRecipes) => {
      const updatedFavouriteRecipes = [...prevRecipes, recipe];
      localStorage.setItem('favouriteRecipes', JSON.stringify(updatedFavouriteRecipes));
      return updatedFavouriteRecipes;
    });
  }

  const removeFavouriteRecipe = (id) => {
    setFavouriteRecipe((prevRecipes) => {
      const updatedFavouriteRecipes = prevRecipes.filter(recipe => recipe.id !== id);
      localStorage.setItem('favouriteRecipes', JSON.stringify(updatedFavouriteRecipes));
      return updatedFavouriteRecipes;
    });
  }

  return (
    <FavouriteContext.Provider value={{ favouriteRecipe, addFavouriteRecipe, removeFavouriteRecipe }}>
      {children}
    </FavouriteContext.Provider>
  );
}
