import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import { CiFilter } from "react-icons/ci";
import RecipeLink from "../RecipesLink/RecipeLink";
import { Link, useNavigate } from "react-router-dom";

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

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { recipes, error } = RecipeLink({ query });
  const navigate = useNavigate();

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

  return (
    <>
      <div className="searchDiv">
        <SearchInput query={query} handleChange={handleChange} />
        {/* <select className="filter">
          <option>
            <CiFilter className="filterIcon" /> Filter
          </option>
        </select> */}
      </div>

      {/* <div className="shareRecipeDiv">
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
      </div> */}

      <div className="recipeHeading">
        <div className="recipes">Popular Recipes</div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="recipeContainer">
        <div className="recipeDiv">
          {recipes &&
            recipes.map((item) => (
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
                        .slice(0, 9)
                        .map((ingredient) => (
                          <div key={ingredient.id} className="ingredient">
                            <img
                              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                              alt={ingredient.name}
                              className="ingredientsImg"
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
                          item.analyzedInstructions[0]?.steps
                      )
                    }
                  >
                    Recipe Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
