"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUtensils, faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "./components/RecipeCard";
import LottieAnimation from "./components/LottieAnimation";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  
  useEffect(() => {
    axios.get("https://food-backend.blosomtrade.com/api/recipes")
      .then((response) => {
        setRecipes(response.data);
        setTrendingRecipes(response.data.slice(0, 5)); // Trending section
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const response = await axios.post("https://food-backend.blosomtrade.com/api/restaurants", { location: search });
      alert("Search saved successfully!");
      setSearch(""); // Clear search bar after submission
    } catch (error) {
      console.error("Error saving search:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* 🔥 Hero Section */}
      <div className="text-center bg-purple-700 text-white py-16">
        <h1 className="text-4xl font-bold">🍽️ Welcome to Miss Ore&quot;s Food Inquiry</h1>
        <p className="mt-2 text-lg">Discover delicious recipes & restaurants near you!</p>
      </div>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} 
      className="max-w-lg mx-auto my-8 flex items-center border rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="w-full p-3 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="bg-purple-700 text-white px-4 py-2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {/* 🍔 Featured Recipes */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Featured Recipes
        </h2>
        {loading ? (
          <LottieAnimation />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipes.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link href="/recipes" className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-800">
            View More Recipes
          </Link>
        </div>
      </div>

      {/* 🔥 Trending Recipes */}
      <div className="p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-500">
          <FontAwesomeIcon icon={faFire} className="mr-2 text-red-500" /> Trending Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* 🌟 Testimonials */}
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">
          <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" /> What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <p className="text-gray-700 italic">The best food discovery app! Found amazing recipes easily!</p>
            <p className="text-sm text-gray-500 mt-2">Sarah J.</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <p className="text-gray-700 italic">Helped me find great restaurants nearby. Highly recommended!</p>
            <p className="text-sm text-gray-500 mt-2">James D.</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <p className="text-gray-700 italic">Love the easy-to-use search function and beautiful design!</p>
            <p className="text-sm text-gray-500 mt-2">Emily R.</p>
          </div>
        </div>
      </div>

      {/* 🎉 Call to Action */}
      <div className="text-center py-10 bg-purple-700 text-white">
        <h2 className="text-3xl font-bold">Join our Food Inquiry Community!</h2>
        <p className="mt-2">Sign up for free and start exploring the best food experiences!</p>
        <Link href="/signup" className="bg-white text-purple-700 px-6 py-2 rounded-lg shadow-md mt-4 inline-block hover:bg-gray-200">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
