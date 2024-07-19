import React, { useState, useEffect } from "react";
import SideBar from "../SideHomePage/SideBar";
import "./MealPlannar.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { addDays, startOfWeek, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMealPlan } from "../context/MealPlanContext";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const MealPlannar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
  const { mealPlans, addToMealPlan, removeMealPlan, setMealPlans } = useMealPlan();
  const [showModal, setShowModal] = useState(null);
  const [dayShowModal, setDayShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [scheduledMeals, setScheduledMeals] = useState(
    JSON.parse(localStorage.getItem("scheduledMeals")) || {}
  );

  useEffect(() => {
    localStorage.setItem("scheduledMeals", JSON.stringify(scheduledMeals));
  }, [scheduledMeals]);

  const closeModal = () => setShowModal(null);
  const closeDayModal = () => {
    setDayShowModal(false);
    document.body.style.overflow = "auto"; // Enable background scrolling when modal is closed
  };

  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleClick = (day) => {
    const selectedDate = addDays(startOfCurrentWeek, day);
    navigate("/meal/day", {
      state: {
        day: format(selectedDate, "EEEE"),
        date: format(selectedDate, "MMM d"),
      },
    });
  };

  const handleDaymodal = (recipe) => {
    setSelectedRecipe(recipe);
    setDayShowModal(true);
    setShowModal(null);
    document.body.style.overflow = "hidden"; // Disable background scrolling when modal is open
  };

  const handleAssignRecipeToDay = (day, mealType) => {
    const selectedDate = format(addDays(startOfCurrentWeek, day), "yyyy-MM-dd");
    setScheduledMeals({
      ...scheduledMeals,
      [selectedDate]: {
        ...scheduledMeals[selectedDate],
        [mealType]: selectedRecipe,
      },
    });
    closeDayModal();
  };

  const navigateToRecipeDetail = (recipe) => {
    navigate("/recipeDetails", { state: recipe });
  };

  const DayModal = () => {
    const [modalCurrentDate, setModalCurrentDate] =
      useState(startOfCurrentWeek);
    const [selectedMealType, setSelectedMealType] = useState("Breakfast");

    const handlePrevModalWeek = () => {
      setModalCurrentDate(addDays(modalCurrentDate, -7));
    };

    const handleNextModalWeek = () => {
      setModalCurrentDate(addDays(modalCurrentDate, 7));
    };

    const startOfModalWeek = startOfWeek(modalCurrentDate, { weekStartsOn: 1 });
    const endOfModalWeek = addDays(startOfModalWeek, 6);

    return (
      <div className="dayModalOverlay">
        <div className="dayModal">
          <button className="closeModalButton1" onClick={closeDayModal}>
            x
          </button>
          <div className="modalHeader">
            <strong>Current Date</strong>
          </div>
          <div className="dateRange">
            <button className="navButton" onClick={handlePrevModalWeek}>
              <IoIosArrowBack />
            </button>
            <div className="date">
              {format(startOfModalWeek, "MMM d")} -{" "}
              {format(endOfModalWeek, "MMM d")}
            </div>
            <button className="navButton" onClick={handleNextModalWeek}>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="dropdownContainer">
            <select
              className="mealDropdown"
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="days">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div
                className="day"
                key={day}
                onClick={() => handleAssignRecipeToDay(index, selectedMealType)}
              >
                {day}
                <span className="arrow">
                  <input type="checkbox" />
                </span>
              </div>
            ))}
          </div>
          <button onClick={closeDayModal} className="doneButton">
            Done
          </button>
        </div>
      </div>
    );
  };

  const AddModal = ({ position, recipeId, recipe, setMealPlans }) => {
    const handleClose = () => {
      setShowModal(null);
    };
  
    const handleRemoveRecipe = () => {
      removeMealPlan(recipeId);
      handleClose();
      setMealPlans((prevMealPlans) => {
        const updatedMealPlans = { ...prevMealPlans };
        delete updatedMealPlans[recipeId];
        alert("Removed Successfully")
        return updatedMealPlans;
      });
      // 
      // closeModal();
    };
  
    return (
      <div
        className="modal2"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        <button className="closeModalButton" onClick={handleClose}>
          X
        </button>
        <div className="modalContent2">
          <button onClick={() => handleDaymodal(recipe)}>Choose Day</button>
          <button onClick={handleRemoveRecipe}>Remove from unscheduled</button>
        </div>
      </div>
    );
  };
  
  const renderScheduledMeals = (dayIndex) => {
    const selectedDate = format(
      addDays(startOfCurrentWeek, dayIndex),
      "yyyy-MM-dd"
    );
    const meals = scheduledMeals[selectedDate];
    if (!meals) return null;

    return Object.entries(meals).map(([mealType, recipe]) => (
      <div key={mealType} className="scheduledMeal">
        <div
          className="scheduledImageDiv"
          onClick={() => navigateToRecipeDetail(recipe)}
        >
          <div className="iconDivs">
            <button
              className="iconBtns"
              // onClick={(e) => {
              //   const rect = e.currentTarget.getBoundingClientRect();
              //   setShowModal({ x: rect.left, y: rect.bottom, id: recipe.id, recipe });
              // }}
            >
              <HiOutlineDotsHorizontal size={20} className="icon" />
            </button>
            {/* {showModal && showModal.id === recipe.id && (
                          <AddModal position={showModal} />
                        )} */}
            
          </div>
          <img src={recipe.image} className="scheduledImage" />
        </div>
        <div onClick={() => navigateToRecipeDetail(recipe)}>{recipe.title}</div>
        <div className="mealType">{mealType}</div>
      </div>
    ));
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
                <h3>Unscheduled Meals</h3>
                <div className="mealPlanRecipeRow">
                  {mealPlans[mealType].map((recipe) => (
                    <div key={recipe.id} className="mealPlanRecipe">
                      <div className="iconDiv">
                        <button
                          className="iconBtn"
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setShowModal({
                              x: rect.left,
                              y: rect.bottom,
                              id: recipe.id,
                              recipe,
                              recipeId: recipe.id,
                            });
                          }}
                        >
                          <HiOutlineDotsHorizontal size={20} className="icon" />
                        </button>
                        {showModal && showModal.id === recipe.id && (
                        <AddModal
                        position={showModal}
                        recipeId={recipe.id}
                        recipe={recipe}
                        setMealPlans={setMealPlans}
                      />
                        )}
                      </div>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="mealPlanRecipeImage"
                        onClick={() => navigateToRecipeDetail(recipe)}
                      />
                      <div
                        className="mealPlanRecipeTitle"
                        onClick={() => navigateToRecipeDetail(recipe)}
                      >
                        {recipe.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {dayShowModal && <DayModal />}
          <div className="days">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div className="day" key={day}>
                <div className="daysAndArrow">
                  {day}
                  <span className="arrow">
                    <button
                      onClick={() => handleClick(index)}
                      className="dayBtn"
                    >
                      {">"}
                    </button>
                  </span>
                </div>
                <div className="mealDayWise">{renderScheduledMeals(index)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlannar;
