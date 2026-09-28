const mongoose = require("mongoose");

const bcryptjs = reqiuire(`bcryptsjs`);


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required:true
    },

    hasAtmCard:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: [ `admin`, `user`],
        default: `user`
    },
    phone: {
        type: String,
        required: true
    },
    timestamps: true  // Date created and updated at
});


// Create model from schema

const User = mongoose.model("User", userSchema);