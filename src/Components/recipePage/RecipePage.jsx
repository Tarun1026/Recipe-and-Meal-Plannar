import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Home/HomePage.css";
import SideBar from "../SideHomePage/SideBar";
import "./RecipePage.css";
import useMealCategoriesLink from "../hook/useMealCategoriesLink";
import { Link } from "react-router-dom";
import useMealTypesLink from "../hook/useMealTypesLink";
import MealsCategory from "./meals/MealsCategory";

const SearchInput = ({ query, handleChange }) => {
  return (
    <input
      type="text"
      placeholder="Search your recipe"
      className="searchBar"
      value={query}
      onChange={handleChange}
    />
  );
};

const RecipePage = () => {
  const [query, setQuery] = useState("");
  const [dynamicUrl, setDynamicUrl] = useState("");
  const { meal } = useMealCategoriesLink();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const query = e.target.value;
    setQuery(query);
  }, []);

  const handleClick = (item) => {
    const newUrl = `https://api.spoonacular.com/recipes/complexSearch?type=${item.name}&number=5&apiKey=87db0a533f81463e979ef6766e426dfa
`;
    setDynamicUrl(newUrl);
    navigate('/recipe/mealCategory', { state: { dynamicUrl: newUrl } });
   

  };

  useEffect(() => {
    console.log("dynamicUrl updated:", dynamicUrl);
  }, [dynamicUrl]);

  return (
    <div className="divs">
      <div className="firstDiv">
        <SideBar />
      </div>
      <div className="leftDiv">
        <div className="search">
          <SearchInput query={query} handleChange={handleChange} />
          <select className="filter">
            <option>Filter</option>
          </select>
        </div>
        <div className="category">
          {meal.map((item) => (
            <div key={item.name} className="fit">
              <button onClick={() => handleClick(item)} className="recBtn">
                <img src={item.image} className="imgCategory" alt={item.name} />
                <h3  className="recipeName">{item.name}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
