import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard2() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Log Button at top-right corner */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Log Out
      </button>

      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Welcome to Dashboard
          </h1>

          <div className="mb-4">
            <button
              onClick={() => navigate("/search")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
          </div>

          <div>
            <button
              onClick={() => navigate("/mylist")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
