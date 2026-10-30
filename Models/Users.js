
const mongoose = require("mongoose");

// Create user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        hasAdminPrivileges: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ["user", "superadmin", "storekeeper", "salesperson"],
            default: "user"
        },

        phone: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Create User model
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
 