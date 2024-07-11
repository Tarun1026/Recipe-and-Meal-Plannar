import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
    const location = useLocation();
    const { nutrients, steps } = location.state || {}; // Destructure with default empty object if location.state is undefined

    console.log('Steps:', steps); // Log steps to console for debugging

    if (!nutrients) return <p>Nutrients not found</p>;

    // Define the key nutrients to highlight
    const keyNutrients = ['Calories', 'Carbohydrates', 'Fat', 'Protein'];

    return (
        <div className="detailContainer">
            {steps && steps.length > 0 && (
                <div className="instructions">
                    <h2>Steps to Make Recipe</h2>
                    <ol>
                        {steps.map((stepNo, index) => (
                            <li key={index}>
                                {stepNo.step}
                                {/* Check if ingredients exist and map them */}
                                {stepNo.ingredients && (
                                    <div>
                                        <h3>Ingredient Use</h3>
                                        <ul className="ingredientList">
                                            {stepNo.ingredients.map((item, idx) => (
                                                <li key={idx} className="ingredientItem">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="ingredientImg"
                                                    />
                                                    <span className="ingredientName">{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
            <div className="nutritionChart">
                <h2>Nutrition Information</h2>
                <div className="nutritionDetails">
                    {nutrients.map((nutrient, index) => (
                        <div key={index} className={`nutritionItem ${keyNutrients.includes(nutrient.name) ? 'highlighted' : ''}`}>
                            <div className="nutritionName">{nutrient.name}</div>
                            <div className="nutritionAmount">
                                {nutrient.amount} {nutrient.unit}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Detail;
