import React, { useState } from "react";
import SideBar from "../SideHomePage/SideBar";
import "./MealPlannar.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { addDays, startOfWeek, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMealPlan } from "../context/MealPlanContext";

const MealPlannar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
  const { mealPlans } = useMealPlan();

  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleClick = (day) => {
    const selectedDate = addDays(startOfCurrentWeek, day);
    navigate("/meal/day", { state: { day: format(selectedDate, "EEEE"), date: format(selectedDate, "MMM d") } });
  };

  return (
    <div className="Div">
      <div className="firstDivs">
        <SideBar />
      </div>
      <div className="rightDiv">
        <div className="contains">
          <div className="headingMeal">
            <div className="mealTitle">Meal Planner</div>
            <div className="dateRange">
              <button className="navButton" onClick={handlePrevWeek}>
                <FaArrowLeft />
              </button>
              <div className="date">
                {format(startOfCurrentWeek, "MMM d")} -{" "}
                {format(endOfCurrentWeek, "MMM d")}
              </div>
              <button className="navButton" onClick={handleNextWeek}>
                <FaArrowRight />
              </button>
            </div>
            <button className="addButton">+ Add</button>
          </div>
          <div className="mealPlanRecipes">
            {Object.keys(mealPlans).map((mealType) => (
              <div key={mealType}>
                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                {mealPlans[mealType].map((recipe) => (
                  <div key={recipe.id} className="mealPlanRecipe">
                    <img src={recipe.image} alt={recipe.title} className="mealPlanRecipeImage" />
                    <div>{recipe.title}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="days">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <div className="day" key={day}>
                {day}{" "}
                <span className="arrow">
                  <button onClick={() => handleClick(index)} className="dayBtn">
                    {">"}
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlannar;
