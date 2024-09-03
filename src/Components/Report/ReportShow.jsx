import React, { useState } from "react";
import "./ReportShow.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";

const ReportShow = () => {
  const[reportType,setReportType]=useState("week")
  const handleReportChange=(e)=>{
    setReportType(e.target.value)
  }
  const getDateOptions = () => {
    if (reportType === "day") {
      return (
        <>
          <option>November 13</option>
          <option>November 12</option>
          <option>November 11</option>
          {/* Add more day-wise options */}
        </>
      );
    } else if (reportType === "week") {
      return (
        <>
          <option>From 7-13 November</option>
          <option>From 1-7 November</option>
          <option>From 25-31 October</option>
          {/* Add more week-wise options */}
        </>
      );
    } else if (reportType === "month") {
      return (
        <>
          <option>November 2023</option>
          <option>October 2023</option>
          <option>September 2023</option>
          {/* Add more month-wise options */}
        </>
      );
    }
  };

  return (
    <>
      <div className="main">
        <div className="icon">
          <IoMdNotifications size={30} />
        </div>
        <div className="reportWeek">
          <div className="report">Report</div>
          <div className="week">on this 
            <select className="charts" value={reportType} onChange={handleReportChange}>
              <option>
                week
              </option>
              <option>day</option>
              <option>month</option>
            </select>
          </div>
        </div>
        <div className="date">
          <select className="dropdown">
            {/* <option>From 7-13 November</option> */}
            {getDateOptions()}
          </select>
        </div>
        <div className="circle-container">
          <div className="circle">
            <div className="circle-text">7 days</div>
          </div>
        </div>
        <div className="foodData">
          <div className="foodDataDiv1">
            <div className="box1">
              <div className="b1"></div>
              <div className="padding">
                Calories
                <div className="foodDetails">1268cal</div>
              </div>
            </div>
            <div className="box2">
              <div className="b2"></div>
              <div className="padding">
                Carbohydrates
                <div className="foodDetails">575g</div>
              </div>
            </div>
          </div>
          <div className="foodDataDiv2">
            <div className="box1">
              <div className="b3"></div>
              <div className="padding">
                Fats
                <div className="foodDetails">654g</div>
              </div>
            </div>
            <div className="box4">
              <div className="b4"></div>
              <div className="padding">
                Protein
                <div className="foodDetails">568g</div>
              </div>
            </div>
          </div>
        </div>
        <div className="moreRecipe">
          <div className="headingMoreRecipe">
            <div className="heading1">More Recipe</div>
            <div className="viewMore">
              View more <FaArrowRightLong className="arrowIcon" />
            </div>
          </div>
          <div className="r">
            <div className="recipeBox">
              <img
                src="https://th.bing.com/th/id/R.3fd9b9ae877142b556c00049105161db?rik=gvyfMJ8W06rTDg&riu=http%3a%2f%2fwww.youngliving.com%2fblog%2fwp-content%2fuploads%2f2017%2f02%2fblog-Thai-Soup-Recipe_Instagram_US.jpg&ehk=7cpXLcHUIf%2frqttxmwYheoFLVLYy8lv1tzCjxGPHmPk%3d&risl=&pid=ImgRaw&r=0"
                alt="Recipe 1"
                className="recipeImage"
              />
              <div className="recipeDetails">
                <div className="recipeTitle">Autumn Soup</div>
                <div className="recipeDescription">
                  With an appetizing almond mixture
                </div>
              </div>
            </div>
            <div className="recipeBox2">
              <img
                src="https://th.bing.com/th/id/OIP.urOz2IFRCL87rPwVk7_bYwHaEK?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Recipe 2"
                className="recipeImage"
              />
              <div className="recipeDetails">
                <div className="recipeTitle">Grilled Sandwich</div>
                <div className="recipeDescription">
                  With a typical mozzarella
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportShow;
