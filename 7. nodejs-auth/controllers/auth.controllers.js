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
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User doesn't exists`,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30m",
            }
        );

        res.status(200).json({
            success: true,
            message: "Logged in successful",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        //extract old and new password;
        const { oldPassword, newPassword } = req.body;

        //find the current logged in user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        //check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is not correct! Please try again.",
            });
        }

        //hash the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update user password
        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    changePassword
};