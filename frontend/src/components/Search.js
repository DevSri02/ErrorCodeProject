import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchCode, setSearchCode] = useState("");
  const [dogImages, setDogImages] = useState([]);
  const [responseCodes, setResponseCodes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    if (!searchCode) {
      setError("Please enter a response code.");
      setLoading(false);
      return;
    }

    const codes = [
      101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 218, 226, 300,
      301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
      501, 402, 503, 504, 505, 506, 507, 508, 509, 510, 511, 520, 521, 522, 523,
      524, 525, 526, 527, 529, 530, 561, 598, 599,
    ];

    // Create regex pattern based on searchCode
    const pattern = searchCode.replace(/x/g, "\\d");
    const regex = new RegExp(`^${pattern}$`);

    const values = codes.filter((c) => regex.test(c.toString()));

    if (values.length === 0) {
      setError("No matching codes found.");
      setLoading(false);
      return;
    }

    const images = values.map((value) => `https://http.dog/${value}.jpg`);
    setDogImages(images);
    setResponseCodes(values);
    setLoading(false);
  };

  const handleSaveList = async () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("User");
    console.log(userName);
    if (!token) {
      setError("No token found, user might not be logged in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/lists",
        {
          name: "My Dog List",
          user: userName,
          responseCodes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("List saved successfully!"); // Alert on successful save
    } catch (error) {
      if (error.response) {
        setError(`Error saving list: ${error.response.data.message}`);
      } else if (error.request) {
        setError("Error saving list: No response from server.");
      } else {
        setError(`Error saving list: ${error.message}`);
      }
      console.error("Error saving list:", error);
    }
  };

  return (
    <div className="search-container p-4">
      <h2 className="text-center text-2xl mb-4">
        Search Dog Images by Response Code
      </h2>

      <div className="mb-4">
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Enter Response Code (e.g., 203, 2xx, 20x)"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        {dogImages.length > 0 ? (
          dogImages.map((url, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={url}
                alt={`dog ${index}`}
                className="w-full h-auto rounded shadow mb-2"
              />
              <p>Response Code: {responseCodes[index]}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No images to display.</p>
        )}
      </div>

      {dogImages.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handleSaveList}
            className="bg-green-500 text-white p-2 rounded"
          >
            Save List
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
