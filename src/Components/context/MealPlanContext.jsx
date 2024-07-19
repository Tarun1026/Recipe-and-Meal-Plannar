import React, { createContext, useContext, useState, useEffect } from "react";

// Create MealPlanContext
const MealPlanContext = createContext();

export const useMealPlan = () => useContext(MealPlanContext);

export const MealPlanProvider = ({ children }) => {
  const [mealPlans, setMealPlans] = useState({});

  // Load meal plans from local storage on initialization
  useEffect(() => {
    const storedMealPlans = localStorage.getItem("mealPlans");
    if (storedMealPlans) {
      setMealPlans(JSON.parse(storedMealPlans));
    }
  }, []);

  // Update local storage whenever mealPlans state changes
  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
  }, [mealPlans]);

  // Add a recipe to a meal plan
  const addToMealPlan = (mealType, recipe) => {
    setMealPlans((prevMealPlans) => {
      const updatedMealPlans = {
        ...prevMealPlans,
        [mealType]: prevMealPlans[mealType]
          ? [...prevMealPlans[mealType], recipe]
          : [recipe],
      };
      return updatedMealPlans;
    });
  };

  // Remove a recipe from the meal plan
  const removeMealPlan = (recipeId) => {
    setMealPlans((prevMealPlans) => {
      const updatedMealPlans = { ...prevMealPlans };
      Object.keys(updatedMealPlans).forEach((mealType) => {
        updatedMealPlans[mealType] = updatedMealPlans[mealType].filter((recipe) => recipe.id !== recipeId);
        if (updatedMealPlans[mealType].length === 0) {
          delete updatedMealPlans[mealType];
        }
      });
      return updatedMealPlans;
    });
  };

  return (
    <MealPlanContext.Provider value={{ mealPlans, addToMealPlan, removeMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
