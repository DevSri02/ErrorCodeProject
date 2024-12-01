import React, { useEffect, useState } from "react";
import axios from "axios"; // Import configured axios
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("User");
    const token = localStorage.getItem("token");

    if (!userName || !token) {
      setError("User is not logged in. Please log in to view your lists.");
      return;
    }

    const fetchLists = async () => {
      try {
        console.log("Fetching lists...");
        const response = await axios.get(
          `http://localhost:5000/api/lists/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched data:", response.data);
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setError("Failed to fetch lists. Please try again later.");
      }
    };

    fetchLists();
  }, []);

  const handleEdit = (listId) => {
    if (!listId) {
      console.error("List ID is missing. Cannot navigate to the edit page.");
      return;
    }

    navigate(`/edit-list/${listId}`); // Redirects to the edit page for the specific list
  };

  const handleDelete = async (listId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/lists/${listId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error("Error deleting list:", error);
      setError("Failed to delete the list. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Lists</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {lists.length > 0 ? (
        <ul className="space-y-6">
          {lists.map((list) => (
            <li
              key={list._id}
              className="border p-4 rounded shadow-lg bg-white"
            >
              <h3 className="text-2xl font-semibold mb-4">{list.name}</h3>
              {/* Display images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {list.imageLinks && list.imageLinks.length > 0 ? (
                  list.imageLinks.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Image ${index}`}
                      className="w-full h-auto object-cover rounded shadow"
                    />
                  ))
                ) : (
                  <p className="col-span-full text-gray-500">
                    No images available.
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(list._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(list._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No lists available. Start by creating a new list!
        </p>
      )}
    </div>
  );
};

export default MyList;
