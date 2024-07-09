import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
    const location = useLocation();
    const { nutrients, steps } = location.state || {}; // Destructure with default empty object if location.state is undefined

    if (!nutrients) return <p>Nutrients not found</p>;

    // Define the key nutrients to highlight
    const keyNutrients = ['Calories', 'Carbohydrates', 'Fat', 'Protein'];

    return (
        <div className="detailContainer">
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

            {steps && steps.length > 0 && (
                <div className="instructions">
                    <h2>Instructions</h2>
                    <ol>
                        {steps.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default Detail;
