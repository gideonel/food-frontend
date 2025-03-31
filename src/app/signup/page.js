"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LottieAnimation from "../components/LottieAnimation";

const Signup = () => {
  const [username, setUsername] = useState("");  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username.trim()) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password2 !== password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://food-backend.blosomtrade.com/api/auth/register", {
        username,  
        name,
        email,
        password,
      });

      router.push("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"  
            className="w-full p-2 mb-4 border rounded text-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-4 border rounded text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded text-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Verify Password"
            className="w-full p-2 mb-4 border rounded text-gray-500"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? <LottieAnimation /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
