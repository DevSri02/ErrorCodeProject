const express = require("express");
const {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} = require("../controllers/listController");
const verifyToken = require("../middlewares/verifyToken"); // Ensure correct path

const router = express.Router();

router.post("/", verifyToken, createList); // Secured route
//router.get("/", verifyToken, getLists);
router.get("/:id", verifyToken, getList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;
