"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
// import LottieAnimation from "../components/LottieAnimation";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://food-backend.blosomtrade.com/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading recipes...</p>;
  }

  return (
    <div>
    <h2 className="text-center text-2xl font-bold my-4">Our Recipes</h2>
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p className="text-center col-span-3">No recipes found</p>
      )}
    </div>
  </div>
  
  );
};

export default Recipes;
