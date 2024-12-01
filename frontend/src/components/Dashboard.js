import React from "react";
import { useNavigate } from "react-router-dom";

const Defaultpage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
        <p className="mb-4 text-center">Please choose an option to continue.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Defaultpage;
