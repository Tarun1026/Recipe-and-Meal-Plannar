import React, { useState } from "react";
import SideBar from "../SideHomePage/SideBar";
import "./MealPlannar.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { addDays, startOfWeek, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMealPlan } from "../context/MealPlanContext";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosArrowForward,IoIosArrowBack} from "react-icons/io";
const MealPlannar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
  const { mealPlans } = useMealPlan();
  const [showModal, setShowModal] = useState(null);
  const [dayShowModal, setDayShowModal] = useState(false);

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
      state: { day: format(selectedDate, "EEEE"), date: format(selectedDate, "MMM d") },
    });
  };

  const handleDaymodal = () => {
    setDayShowModal(true);
    setShowModal(null);
    document.body.style.overflow = "hidden"; // Disable background scrolling when modal is open
  };

  const DayModal = () => (
    <div className="dayModalOverlay">
      <div className="dayModal">
        <button className="closeModalButton1" onClick={closeDayModal}>x</button>
        <div className="modalHeader">
          <strong>Current Date</strong>
        </div>
        <div className="dateRange">
          <button className="navButton" onClick={handlePrevWeek}>
          <IoIosArrowBack />
          </button>
          <div className="date">
            {format(startOfCurrentWeek, "MMM d")} - {format(endOfCurrentWeek, "MMM d")}
          </div>
          <button className="navButton" onClick={handleNextWeek}>
          <IoIosArrowForward />
          </button>
        </div>
        <div className="dropdownContainer">
          <select className="mealDropdown">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>
        </div>
        <div className="days">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
            <div className="day" key={day}>
              {day}
              <span className="arrow">
                <input type="checkbox" />
              </span>
            </div>
          ))}
        </div>
        <button onClick={closeDayModal} className="doneButton">Done</button>
      </div>
    </div>
  );

  const AddModal = ({ position }) => {
    const handleClose = () => {
      setShowModal(null);
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
          <button onClick={handleDaymodal}>Choose Day</button>
          <button>Remove from unscheduled</button>
        </div>
      </div>
    );
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
                            const rect = e.currentTarget.getBoundingClientRect();
                            setShowModal({ x: rect.left, y: rect.bottom, id: recipe.id });
                          }}
                        >
                          <HiOutlineDotsHorizontal size={20} className="icon" />
                        </button>
                        {showModal && showModal.id === recipe.id && (
                          <AddModal position={showModal} />
                        )}
                      </div>
                      <img src={recipe.image} alt={recipe.title} className="mealPlanRecipeImage" />
                      <div className="mealPlanRecipeTitle">{recipe.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {dayShowModal && <DayModal />}
          <div className="days">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <div className="day" key={day}>
                {day}
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
