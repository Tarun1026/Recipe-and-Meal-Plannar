import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useMealTypesLink from "../../hook/useMealTypesLink";
import SideBar from "../../SideHomePage/SideBar";
import { useNavigate } from "react-router-dom";
import "./Meals.css";

const MealsCategory = () => {
  const location = useLocation();
  const { dynamicUrl } = location.state || {};
  const { mealC } = useMealTypesLink(dynamicUrl); // Pass dynamicUrl to the hook
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MealsCategory received dynamicUrl:", dynamicUrl);
  }, [dynamicUrl]);

  const navigateToRecipeDetail = (
    id,
    title,
    image,
    extendedIngredients,
    readyInMinutes,
    nutrients,
    steps
  ) => {
    console.log("Navigating to RecipeDetail with:", {
      id,
      title,
      image,
      extendedIngredients,
      readyInMinutes,
    });
    navigate("/recipeDetails", {
      state: {
        id,
        title,
        image,
        extendedIngredients,
        readyInMinutes,
        nutrients,
        steps,
      },
    });
  };

  return (
    <div className="leftDivs">
      <div className="firstDivs">
        <SideBar />
      </div>
      <div className="recipeGrid">
        {mealC.map((item) => (
          <div key={item.id}>
            <div>
              <button
                className="box"
                onClick={() =>
                  navigateToRecipeDetail(
                    item.id, // Include id here
                    item.title,
                    item.image,
                    item.extendedIngredients,
                    item.readyInMinutes,
                    item.nutrition && item.nutrition.nutrients,
                    item.analyzedInstructions &&
                      item.analyzedInstructions[0]?.steps
                  )
                }
              >
                <img src={item.image} alt={item.title} className="img" />
                <h2 className="recipeTitle">{item.title}</h2>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsCategory;
