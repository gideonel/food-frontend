"use client";
import { useState } from "react";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 p-4">
      <img
        src={`https://food-backend.blosomtrade.com${recipe.image}`}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-2 text-gray-500">{recipe.name}</h3>
      <p className="text-gray-500 flex items-center">
        <FontAwesomeIcon icon={faFire} className="text-red-500 mr-2" />{" "}
        {recipe.calories} kcal
      </p>
      <p className="font-semibold flex items-center text-gray-500">
        <FontAwesomeIcon icon={faDollarSign} className="text-green-500 mr-2" /> ₦
        {recipe.costNaira}
      </p>

      {/* Display All Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mt-2">
          <h4 className="font-semibold text-gray-500">Ingredients:</h4>
          <ul className="text-sm text-gray-700 mt-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="bg-purple-100 p-1 rounded mt-1">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setShowPopup(true)}
        className="text-blue-500 mt-2 underline"
      >
        Convert to USD
      </button>

      {showPopup && (
        <Popup
          costNaira={recipe.costNaira}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default RecipeCard;
