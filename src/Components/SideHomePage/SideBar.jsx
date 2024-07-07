import React from "react";
import "./SideBar.css";
import { CiReceipt, CiHeart } from "react-icons/ci";
import { MdNoMeals } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGrid } from "react-icons/bs";
const SideBar = () => {
  return (
    <>
      <div className="sideBarDiv">
        <div className="heading">eat dish</div>
        <div className="space">
          <ul className="sideList">
            <li className="list">
              <button>
                <BsGrid size={25} />
                Overview
              </button>
            </li>
            <li className="list">
              <button>
                <CiReceipt size={25} />
                Recipe
              </button>
            </li>
            <li className="list">
              <button>
                <CiHeart size={25} />
                Favourite
              </button>
            </li>
            <li className="list">
              <button>
                <MdNoMeals size={25} />
                Your Meal
              </button>
            </li>
            <li className="list">
              <button>
                <IoSettingsOutline size={25} />
                Settings
              </button>
            </li>
          </ul>
          <div className="sideBottomDiv">
            <div className="text">Share Your own recipe with our community</div>
            <div className="btnDiv">
              <button className="btnUpload">Upload Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
