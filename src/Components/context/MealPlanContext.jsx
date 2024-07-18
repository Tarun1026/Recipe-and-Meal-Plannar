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

  return (
    <MealPlanContext.Provider value={{ mealPlans, addToMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
