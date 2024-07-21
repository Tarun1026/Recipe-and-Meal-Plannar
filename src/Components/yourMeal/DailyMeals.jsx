import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideHomePage/SideBar";
import "./DailyMeals.css";
import { useMealPlan } from "../context/MealPlanContext";
import { format } from "date-fns";

const DailyMeals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { day, date, scheduledMeals } = location.state;
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const selectedDate = format(new Date(date), "yyyy-MM-dd");
    if (scheduledMeals && scheduledMeals[selectedDate]) {
      setRecipes(scheduledMeals[selectedDate]);
    } else {
      setRecipes({}); // Reset recipes when scheduledMeals or date changes
    }
  }, [scheduledMeals, date]);

  const handleAddMeal = (mealType, recipe) => {
    const selectedDate = format(new Date(date), "yyyy-MM-dd");
    const updatedScheduledMeals = {
      ...scheduledMeals,
      [selectedDate]: {
        ...scheduledMeals[selectedDate],
        [mealType]: recipe,
      },
    };
    localStorage.setItem("dailyMeals", JSON.stringify(updatedScheduledMeals));
  };

  const navigateToRecipeDetail = (recipe) => {
    navigate("/recipeDetails", { state: recipe });
  };

  return (
    <div className="Div">
      <div className="firstDivs">
        <SideBar />
      </div>
      <div className="rightDiv">
        <div className="contains">
          <div className="headingMeal">
            <div className="mealTitle">{`${day}, ${date}`}</div>
            <button className="addButton" onClick={() => handleAddMeal("Breakfast", { title: "New Breakfast Recipe", image: "https://example.com/breakfast.jpg" })}>
              + Add
            </button>
          </div>
          <div className="days">
            <div className="day1">
              Breakfast
              {recipes.Breakfast && (
                <div onClick={() => navigateToRecipeDetail(recipes.Breakfast)}>
                  <img src={recipes.Breakfast.image} alt={recipes.Breakfast.title} className="categoryImage"/>
                  <div className="categoryTitle">{recipes.Breakfast.title}</div>
                </div>
              )}
            </div>
            <div className="day1">
              Lunch
              {recipes.Lunch && (
                <div onClick={() => navigateToRecipeDetail(recipes.Lunch)}>
                  <img src={recipes.Lunch.image} alt={recipes.Lunch.title} className="categoryImage"/>
                  <div className="categoryTitle">{recipes.Lunch.title}</div>
                </div>
              )}
            </div>
            <div className="day1">
              Dinner
              {recipes.Dinner && (
                <div onClick={() => navigateToRecipeDetail(recipes.Dinner)}>
                  <img src={recipes.Dinner.image} alt={recipes.Dinner.title} className="categoryImage"/>
                  <div className="categoryTitle">{recipes.Dinner.title}</div>
                </div>
              )}
            </div>
            <div className="day1">
              Snacks
              {recipes.Snacks && (
                <div onClick={() => navigateToRecipeDetail(recipes.Snacks)}>
                  <img src={recipes.Snacks.image} alt={recipes.Snacks.title} className="categoryImage"/>
                  <div className="categoryTitle">{recipes.Snacks.title}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMeals;
