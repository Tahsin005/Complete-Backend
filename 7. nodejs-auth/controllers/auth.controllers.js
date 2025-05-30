const User = require('../models/user.models.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkExistingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message:
                "User is already exists either with same username or same email. Please try with a different username or email",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: "User registered successfully!",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register user! please try again.",
            });
        }
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again",
        });
    }
};


const loginUser = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};