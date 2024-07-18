import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./RecipeDetail.css";
import { useFavouriteRecipe } from "../context/FavourtieRecipeContext";
import { useMealPlan } from "../context/MealPlanContext";

const RecipeDetail = () => {
  const location = useLocation();
  const { id, title, image, extendedIngredients, readyInMinutes, nutrients, steps } = location.state || {};

  const { favouriteRecipe, addFavouriteRecipe } = useFavouriteRecipe();
  const { addToMealPlan } = useMealPlan();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const updateItemsToShow = () => {
      const containerWidth = document.querySelector(".nutritionDetails").offsetWidth;
      const itemWidth = 120;
      const newItemsToShow = Math.floor(containerWidth / itemWidth);
      setItemsToShow(newItemsToShow);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [showModal]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, nutrients.length - itemsToShow)
    );
  };

  const handleAddFavourite = () => {
    const recipe = {
      id,
      title,
      image,
      extendedIngredients,
      readyInMinutes,
      nutrients,
      steps,
    };

    const isDuplicate = favouriteRecipe.some((m) => m.id === recipe.id);
    if (isDuplicate) {
      alert("This Recipe is already in your Favourite list!");
      return;
    }
    addFavouriteRecipe(recipe);
    alert("Recipe added to Favourite List");
  };

  const handleAddToMealPlan = (mealPlan) => {
    const recipe = {
      id,
      title,
      image,
      extendedIngredients,
      readyInMinutes,
      nutrients,
      steps,
    };
    addToMealPlan(mealPlan, recipe);
  };
  const MealModal = ({ onAddToMealPlan }) => {
    const handleAddToMealPlan = (mealPlan) => {
      onAddToMealPlan(mealPlan);
      closeModal();
    };
  
    return (
      <div className="modal">
        <div className="modalContent">
          <button className="closeModalButton" onClick={closeModal}>X</button>
          <button onClick={() => handleAddToMealPlan()}>Meal Plan</button>
          <button>Shopping List</button>
        </div>
      </div>
    );
  };
  
  
  return (
    extendedIngredients && (
      <div className="recipeDetail">
        <div className="contentWrapper">
          <div className="rightDivs">
            <div className="recipeHeader">
              <h1 className="recipeTitle2">{title}</h1>
            </div>
            <div className="recipeInfo">
              <div className="ingredientsMinutes">
                <div className="ingredients">
                  {extendedIngredients.length} Ingredients
                </div>
                <div className="separator" />
                {readyInMinutes && (
                  <div className="minutes">
                    {readyInMinutes} Minutes
                  </div>
                )}
              </div>
              <div className="addToMeal">
                <button onClick={handleAddFavourite} className="btnAdd">
                  Add to Favourites
                </button>
              </div>
              <div className="addToMeal" style={{ position: "relative" }}>
                <button onClick={() => setShowModal(true)} className="btnAdd">
                  Add to Meal
                </button>
                {showModal && <MealModal onAddToMealPlan={handleAddToMealPlan} />}
              </div>
            </div>
          </div>
          <div>
            <img src={image} alt={title} className="recipeImg" />
          </div>
        </div>
        <div className="ingredientsList">
          <h2>Ingredients</h2>
          {extendedIngredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient">
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                className="ingredientsImg"
              />
              <p className="ingredientNameUp">{ingredient.original}</p>
            </div>
          ))}
        </div>
        <div className="nutritionCharts">
          <h2>Nutrition Information</h2>
          <div className="sliderContainer">
            {currentIndex > 0 && (
              <button onClick={handlePrevClick} className="arrowButton">
                &lt;
              </button>
            )}
            <div className="nutritionDetails">
              {nutrients.slice(currentIndex, currentIndex + itemsToShow).map((nutrient, index) => (
                <div key={index} className="nutritionItem">
                  <div className="nutritionCircle">
                    <div className="nutritionName">{nutrient.name}</div>
                    <div className="nutritionAmount">
                      {nutrient.amount} {nutrient.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {currentIndex + itemsToShow < nutrients.length && (
              <button onClick={handleNextClick} className="arrowButton">
                &gt;
              </button>
            )}
          </div>
        </div>
        <div className="detailContainer">
          {steps && steps.length > 0 && (
            <div className="instructions">
              <h2>Steps to Make Recipe</h2>
              <ol>
                {steps.map((stepNo, index) => (
                  <li key={index}>
                    {stepNo.step}
                    {stepNo.ingredients && stepNo.ingredients.length > 0 && (
                      <div>
                        <h3 className="ingredientUseHeading">Ingredient Use</h3>
                        <ul className="ingredientList">
                          {stepNo.ingredients.map((item, idx) => (
                            <li key={idx} className="ingredientItem">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="ingredientImg"
                              />
                              <span className="ingredientName">{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default RecipeDetail;
