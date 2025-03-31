"use client";
 
import axios from "axios";

 

const API_URL = "https://food-backend.blosomtrade.com/api/auth"; 

export const loginUser = async (email, password) => {
  console.log("🚀 Sending login request:", { email, password });

  try {
    const response = await axios.post("https://food-backend.blosomtrade.com/api/auth/login", 
      { email, password }, 
      { withCredentials: true }  
    );
    
    console.log("✅ Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    return { error: "Login failed. Please try again." };
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");  
  window.location.href = "/login"; 
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");  
};
