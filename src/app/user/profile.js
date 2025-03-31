"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");  
        const response = await axios.get("https://food-backend.blosomtrade.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user ? (
        <div>
          <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-2">{user.username}</h3>
          <p className="text-center text-gray-600">{user.email}</p>
          <p className="text-center text-gray-600">{user.location}</p>
          <p className="mt-4 text-gray-800">{user.bio}</p>
        </div>
      ) : (
        <p className="text-center text-red-500">Profile not found.</p>
      )}
    </div>
  );
};

export default Profile;
