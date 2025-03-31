"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
const LottieAnimation = dynamic(() => import("../components/LottieAnimation"), { ssr: false });


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
  setTimeout(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/");
  }, 100); // Small delay to prevent blocking
}, [router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://food-backend.blosomtrade.com/api/auth/login",
        { email, password },
        { withCredentials: true, timeout: 5000 } // Set 5s timeout
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <LottieAnimation />
      ) : (
        <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded text-grey-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded text-grey-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? <LottieAnimation /> : 'Login'}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
