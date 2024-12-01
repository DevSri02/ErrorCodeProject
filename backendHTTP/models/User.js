const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Required for password hashing

// User schema definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
      lowercase: true, // Store email in lowercase
      trim: true, // Remove unnecessary spaces
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// **Hashing the password before saving the user**
// userSchema.pre('save', async function (next) {
//   // Check if the password is modified or is a new user
//   if (!this.isModified('password')) return next();

//   try {
//     // Hash the password before saving it
//     const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next(); // Proceed to save the user
//   } catch (error) {
//     next(error); // If there's an error, pass it to the next middleware
//   }
// });

// // **Compare the entered password with the hashed password**
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   try {
//     return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
//   } catch (error) {
//     throw new Error('Password comparison failed');
//   }
// };

// Export the User model
module.exports = mongoose.model("User", userSchema);
