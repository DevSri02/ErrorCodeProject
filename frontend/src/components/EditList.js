import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditList() {
  const { listId } = useParams();
  const [listName, setListName] = useState("");
  const [responseCodes, setResponseCodes] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListDetails = async () => {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("User");

      if (!token) {
        setError("User is not logged in. Please log in to edit the list.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/lists/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data[0].name);
        const { name, responseCodes } = response.data[0];
        setListName(name);
        setResponseCodes(responseCodes || []);
        setImageLinks(
          responseCodes.map((code) => `https://http.dog/${code}.jpg`)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching list details:", error);
        setError("Failed to fetch list details. Please try again later.");
        setLoading(false);
      }
    };

    fetchListDetails();
  }, [listId]);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not logged in. Please log in to save changes.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:5000/api/lists/${listId}`,
        {
          name: listName,
          responseCodes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      alert("List updated successfully!");
      navigate("/mylist");
    } catch (error) {
      console.error("Error updating list:", error);
      setError("Failed to update the list. Please try again.");
      setLoading(false);
    }
  };

  const handleAddResponseCode = () => {
    setResponseCodes([...responseCodes, ""]);
  };

  const handleResponseCodeChange = (index, newValue) => {
    const updatedCodes = [...responseCodes];
    updatedCodes[index] = newValue;
    setResponseCodes(updatedCodes);
    setImageLinks(updatedCodes.map((code) => `https://http.dog/${code}.jpg`));
  };

  const handleRemoveResponseCode = (index) => {
    const updatedCodes = responseCodes.filter((_, i) => i !== index);
    setResponseCodes(updatedCodes);
    setImageLinks(updatedCodes.map((code) => `https://http.dog/${code}.jpg`));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Edit List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">List Name:</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Response Codes:</h2>
            {responseCodes.map((code, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) =>
                    handleResponseCodeChange(index, e.target.value)
                  }
                  className="border p-2 rounded flex-1 mr-2"
                />
                <button
                  onClick={() => handleRemoveResponseCode(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Generated Image Links:</h2>
            <div className="space-y-2">
              {imageLinks.map((link, index) => (
                <div key={index}>
                  <img
                    src={link}
                    alt={`Image for code ${responseCodes[index]}`}
                    className="w-32 h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
