"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from 'next/image';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://food-backend.blosomtrade.com/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading user...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {user ? (
        <div>
          <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center mt-2">{user.username}</h3>
          <p className="text-center text-gray-600">{user.email}</p>
          <p className="text-center text-gray-600">{user.location}</p>
          <p className="mt-4 text-gray-800">{user.bio}</p>
        </div>
      ) : (
        <p className="text-center text-red-500">User not found.</p>
      )}
    </div>
  );
};

export default UserProfile;
