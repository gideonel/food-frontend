"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

// Dynamically import LottieAnimation and disable SSR
const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), {
  ssr: false, // Disable SSR for this component
});

const Restaurants = () => {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      let url = `https://food-backend.blosomtrade.com/api/restaurants/search?query=${query}`;
  
      // If searching by live location
      if (query.toLowerCase() === 'nearby') {
        const { coords } = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        url = `https://food-backend.blosomtrade.com/api/restaurants/nearby?lat=${coords.latitude}&lng=${coords.longitude}`;
      }
  
      const response = await axios.get(url);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Find Nearby Restaurants</h2>

        {/* Search Bar */}
        <div className="flex items-center border rounded-lg p-2 shadow-md">
          <FaSearch className="text-gray-500 mx-2" />
          <input
            type="text"
            placeholder="Search for restaurants..."
            className="w-full p-2 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div className="mt-6">
          {loading && <p className="text-center text-blue-500">Searching...</p>}
          {restaurants.length === 0 && !loading && <p className="text-center text-gray-500">No restaurants found.</p>}

          {loading ? (
            <LottieAnimation />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="border rounded-lg shadow-md p-4">
                  <Image
                    src={`https://food-backend.blosomtrade.com${restaurant.image}`}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="text-lg font-semibold mt-4">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                  <div className="flex items-center mt-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <p className="ml-2">{restaurant.city}, {restaurant.state}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
