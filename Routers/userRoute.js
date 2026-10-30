
const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");

// Register a new user
router.post("/register", userController.CreateUser);

// Login user
router.post("/login", userController.loginUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update user by ID
router.put("/:id", userController.updateUserById);

// Delete user by ID
router.delete("/:id", userController.deleteUserById);

module.exports = router;

//export the router to be used in other files
module.exports = router;