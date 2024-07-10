import React, { useState, useCallback, useLayoutEffect, useRef } from "react";
import "./SearchBar.css";
import { CiFilter } from "react-icons/ci";
import RecipeLink from "../RecipesLink/RecipeLink";
import { FaArrowRightLong, FaArrowLeft } from "react-icons/fa6"; 
import { Link, useNavigate } from "react-router-dom"; 

const SearchInput = ({ query, handleChange }) => {
  // const inputRef = useRef(null);

  // useLayoutEffect(() => {
  //   inputRef.current.focus();
  // }, [inputRef]);

  return (
    <input
      // ref={inputRef}
      type="text"
      placeholder="Search your recipe"
      className="searchBar"
      value={query}
      onChange={handleChange}
    />
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { recipes, error } = RecipeLink({ query });
  const navigate = useNavigate(); 
  const [startIndex, setStartIndex] = useState(0); 

  const handleChange = useCallback(
    (e) => {
      const query = e.target.value;
      setQuery(query);
    },
    []
  );

  const navigateToDetail = (nutrients, steps) => {
    navigate("/details/nutrients", {
      state: { nutrients, steps },
    });
  };

  const handleViewMore = () => {
    setStartIndex(startIndex + 2);
  };

  const handleViewLess = () => {
    setStartIndex(startIndex - 2); 
  };

  return (
    <>
      <div className="searchDiv">
        <SearchInput query={query} handleChange={handleChange} />
        <select className="filter">
          <option>
            <CiFilter className="filterIcon" /> Filter
          </option>
        </select>
      </div>

      <div className="shareRecipeDiv">
        <div className="textContainer">
          <h2 className="add">Add your own recipe</h2>
          <p className="upload">
            Upload your own home-made recipe and share with other members
          </p>
        </div>
        <img
          src="https://th.bing.com/th/id/OIP.vGrbHVwayMqf5MNGiF5aKwHaFS?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Recipe"
          className="img"
        />
      </div>

      <div className="recipeHeading">
        <div className="recipes">Recipes</div>
        {startIndex > 0 && (
          <div className="viewMore" onClick={handleViewLess}>
            <FaArrowLeft className="arrowIcon" /> View less
          </div>
        )}
        {startIndex + 2 < recipes.length && (
          <div className="viewMore" onClick={handleViewMore}>
            View more <FaArrowRightLong className="arrowIcon" />
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="recipeDiv">
        {recipes &&
          recipes.slice(startIndex, startIndex + 2).map((item) => (
            <div key={item.id} className="recipeCard">
              <div className="imgAndName">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="recipeImg"
                  />
                </div>
                <div>
                  <h2 className="recipeName">{item.title}</h2>
                </div>
              </div>
              <div className="ingredientsDetail">
                <h3>Ingredients</h3>
                <div className="ingredients">
                  {item.extendedIngredients &&
                    item.extendedIngredients
                      .slice(0, 6)
                      .map((ingredient) => (
                        <div key={ingredient.id} className="ingredient">
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt={ingredient.name}
                            className="ingredientImg"
                          />
                          <p className="ingredientName">{ingredient.name}</p>
                        </div>
                      ))}
                </div>
              </div>
              <div className="nutrientsDetail">
                <button
                  className="nutrientButton"
                  onClick={() =>
                    navigateToDetail(
                      item.nutrition && item.nutrition.nutrients,
                      item.analyzedInstructions &&
                        item.analyzedInstructions.steps
                    )
                  }
                >
                  Recipe Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchBar;
