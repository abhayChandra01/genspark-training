import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);
      if (user) {
        localStorage.setItem("auth_user_token", JSON.stringify(user));
        toast.success("Logged in successfully!");

        navigate("/customer-details");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="text-blue-500 mt-4"
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
};

export default Login;
