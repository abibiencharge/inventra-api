
const User = require("../Models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// 1. CREATE / REGISTER A NEW USER
// ==========================================


exports.CreateUser = async (req, res) => {
    try {
        const { name, email, password, phone, gender } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone || !gender) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Check existing email
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Check existing phone
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(409).json({
                message: "Phone number already exists"
            });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user
        const newUser = new User({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone,
            gender,
            role: "user",
            hasAdminPrivileges: false
        });

        await newUser.save();

        // Send response
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                gender: newUser.gender,
                role: newUser.role,
                hasAdminPrivileges: newUser.hasAdminPrivileges,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};

      


// ==========================================
// 2. LOGIN USER
// ==========================================

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: user.role,
                hasAdminPrivileges: user.hasAdminPrivileges
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};


// ==========================================
// 3. LOGOUT USER
// ==========================================

exports.logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful. Please remove your token from the client."
        });

    } catch (error) {
        res.status(500).json({
            message: "Error logging out",
            error: error.message
        });
    }
};


// ==========================================
// 4. GET ALL USERS
// ==========================================

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users retrieved successfully",
            totalUsers: users.length,
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        });
    }
};


// ==========================================
// 5. GET A SINGLE USER BY ID
// ==========================================

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: "Error retrieving user",
            error: error.message
        });
    }
};


// ==========================================
// 6. UPDATE USER BY ID
// ==========================================

exports.updateUserById = async (req, res) => {
    try {
        const { name, email, phone, gender } = req.body;

        // Only allow these fields to be updated here.
        // Role and admin privileges require a separate
        // authorized administrative operation.
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (email !== undefined) {
            updateData.email = email.toLowerCase().trim();
        }
        if (phone !== undefined) updateData.phone = phone;
        if (gender !== undefined) updateData.gender = gender;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Please provide valid fields to update"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(400).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


// ==========================================
// 7. DELETE USER BY ID
// ==========================================

exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};
