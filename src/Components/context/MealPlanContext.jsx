import React, { createContext, useContext, useState } from "react";

const MealPlanContext = createContext();

export const useMealPlan = () => useContext(MealPlanContext);

export const MealPlanProvider = ({ children }) => {
  const [mealPlans, setMealPlans] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const addToMealPlan = (mealType, recipe) => {
    setMealPlans((prevMealPlans) => ({
      ...prevMealPlans,
      [mealType]: [...prevMealPlans[mealType], recipe],
    }));
  };

  return (
    <MealPlanContext.Provider value={{ mealPlans, addToMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
