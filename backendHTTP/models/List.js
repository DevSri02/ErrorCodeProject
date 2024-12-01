const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    responseCodes: [
      {
        type: Number,
      },
    ],
    imageLinks: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: String,
      ref: "User", // Reference to the User model
      required: false, // Ensure that the list is always created by a user
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("List", listSchema);
