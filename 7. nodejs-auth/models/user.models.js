const mongoose = require('mongoose');

const usrSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"], // only allow 'user' or 'admin' roles
            default: "user",
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', usrSchema);
module.exports = User;