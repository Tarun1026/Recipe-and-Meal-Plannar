import React from "react";
import "./SideBar.css";
import { CiReceipt, CiHeart } from "react-icons/ci";
import { MdNoMeals } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGrid } from "react-icons/bs";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="sideBarDiv">
        <div className="heading">eat dish</div>
        <div className="space">
          <ul className="sideList">
            <li className="list">
              <Link to="/overview" className="linkButton">
              
                <BsGrid size={28} />
                Overview
              
              </Link>
            </li>
            <li className="list">
              <Link to="/recipe" className="linkButton">
                <CiReceipt size={28} />
                Recipe
              </Link>
            </li>
            <li className="list">
              <Link to="/favourite" className="linkButton">
                <CiHeart size={28} />
                Favourite
              </Link>
            </li>
            <li className="list">
              <Link to="/meal" className="linkButton">
                <MdNoMeals size={28} />
                Your Meal
              </Link>
            </li>
            <li className="list">
              <Link to="/settings" className="linkButton">
                <IoSettingsOutline size={28} />
                Settings
              </Link>
            </li>
          </ul>
          {/* <div className="sideBottomDiv">
            <div className="text">Share Your own recipe with our community</div>
            <div className="btnDiv">
              <Link to="/upload" className="btnUpload">Upload Now</Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
