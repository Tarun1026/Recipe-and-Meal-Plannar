import React, { useState, useCallback } from "react";
import "../Home/HomePage.css";
import SideBar from "../SideHomePage/SideBar";
import "./RecipePage.css";
import useMealCategoriesLink from "../hook/useMealCategoriesLink";

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
  const { meal } = useMealCategoriesLink(); // Correct usage of useMealCategoriesLink

  const handleChange = useCallback((e) => {
    const query = e.target.value;
    setQuery(query);
  }, []);

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
              <div>
              <img src={item.image}  className="imgCategory"/>
              <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
