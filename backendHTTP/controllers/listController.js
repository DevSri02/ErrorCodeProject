// listController.js
const List = require("../models/List");

// Create a list
// Create a list
exports.createList = async (req, res) => {
  try {
    const { name, user, responseCodes } = req.body;

    // Basic validation
    if (!name || !responseCodes || responseCodes.length === 0) {
      return res
        .status(400)
        .json({ message: "Name and responseCodes are required" });
    }

    // Validate response codes
    const invalidCodes = responseCodes.filter(
      (code) => isNaN(code) || code < 100 || code > 599
    );
    if (invalidCodes.length > 0) {
      return res.status(400).json({
        message: `Invalid response code(s): ${invalidCodes.join(", ")}`,
      });
    }

    const imageLinks = responseCodes.map(
      (code) => `https://http.dog/${code}.jpg`
    );

    // if (!req.userId) {
    //   return res.status(401).json({ message: "User  not authenticated" });
    // }
    console.log(user);
    const newList = new List({
      name,
      responseCodes,
      imageLinks,
      createdBy: user,
    });
    await newList.save();

    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating list", error });
  }
};
// Get all lists
exports.getLists = async (req, res) => {
  try {
    // Fetch all lists created by the user
    const lists = await List.find({ createdBy: req.userId });
    res.json(lists);
  } catch (error) {
    // Handle error when fetching lists
    res.status(500).json({ message: "Error fetching lists", error });
  }
};

// Get a specific list
exports.getList = async (req, res) => {
  try {
    // Find list by ID
    console.log("here.....");
    console.log(req.params.id);
    const list = await List.find({ createdBy: req.params.id }); // findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    console.log(list);
    res.json(list);
  } catch (error) {
    // Handle error when fetching a specific list
    res.status(500).json({ message: "Error fetching list", error });
  }
};

// Update a list
exports.updateList = async (req, res) => {
  try {
    const { name, responseCodes } = req.body;

    // Generate image links for the response codes
    const imageLinks = responseCodes.map(
      (code) => `https://http.dog/${code}.jpg`
    );

    // Find and update the list
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { name, responseCodes, imageLinks },
      { new: true } // Return the updated list
    );

    // If list not found, return 404 error
    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    // Respond with the updated list
    res.json(updatedList);
  } catch (error) {
    // Handle error when updating the list
    res.status(500).json({ message: "Error updating list", error });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  try {
    // Find and delete the list by ID
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    // Respond with a success message
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    // Handle error when deleting the list
    res.status(500).json({ message: "Error deleting list", error });
  }
};
