const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing!" });
  }

  try {
    console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
    console.log("token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded", decoded); // Inspect the payload

    req.userId = decoded.id; // Ensure req.userId is set
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
