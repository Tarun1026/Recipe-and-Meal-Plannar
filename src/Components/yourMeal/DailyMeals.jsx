import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideHomePage/SideBar';
// import './DailyMeals.css';

const DailyMeals = () => {
  const location = useLocation();
  const { day, date } = location.state;

  return (
    <div className="Div">
      <div className="firstDivs">
        <SideBar />
      </div>
      <div className="rightDiv">
        <div className="contains">
          <div className="headingMeal">
            <div className="mealTitle">{`${day}, ${date}`}</div>
            <button className="addButton">+ Add</button>
          </div>
          <div className="days">
            <div className="day
            ">
              Breakfast <span className="arrow">{"+"}</span>
            </div>
            <div className="day">
              Lunch <span className="arrow">{"+"}</span>
            </div>
            <div className="day">
              Dinner <span className="arrow">{"+"}</span>
            </div>
            <div className="day">
              Snacks <span className="arrow">{"+"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMeals;
