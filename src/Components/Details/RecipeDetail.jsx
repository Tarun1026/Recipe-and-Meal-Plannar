import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const location = useLocation();
  const { title, image, extendedIngredients, readyInMinutes, nutrients, steps } =
    location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Number of items to show at a time

  useEffect(() => {
    const updateItemsToShow = () => {
      // Calculate how many items can fit in the container
      const containerWidth = document.querySelector(".nutritionDetails").offsetWidth;
      const itemWidth = 120; // Adjust based on your item width and margin
      const newItemsToShow = Math.floor(containerWidth / itemWidth);
      setItemsToShow(newItemsToShow);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, nutrients.length - itemsToShow)
    );
  };

  console.log("RecipeDetail received:", {
    title,
    image,
    extendedIngredients,
    readyInMinutes,
    steps,
  });

  return (
    extendedIngredients && (
      <div className="recipeDetail">
        <div className="contentWrapper">
          <div className="rightDiv">
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
              <div className="addToMeal">Add to meal</div>
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
              <p className="ingredientName">{ingredient.original}</p>
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
                    {stepNo.ingredients && (
                      <div>
                        <h3>Ingredient Use</h3>
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