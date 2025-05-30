const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://mtfferdous35:YQbOAutEYJN7CmUE@cluster0.7amnsxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

async function runQueryExample() {
    try {
        // create a new document
        // const newUser = await User({
        //     name: 'Sagor',
        //     email: 'sagor@affpilot.com',
        //     age: 25,
        //     isActive: false,
        //     tags: ['Jr. Software Engineer']
        // });

        // await newUser.save();

        // console.log("Created new user", newUser);

        // const allUser = await User.find({});
        // console.log("All users:", allUser);

        // const activeUsers = await User.find({ isActive: true });
        // console.log("Active users:", activeUsers);

        // const firstUser = await User.findOne({ age: 20 });
        // console.log("First user:", firstUser);

        // const firstUserID = firstUser._id;
        // const userById = await User.findById(firstUserID);
        // console.log("User by ID:", userById);

        // const selectedFields = await User.find().select("name email -_id")
        // console.log(selectedFields);

        // const limitUsers = await User.find().limit(3).skip(1);
        // console.log("Limited users:", limitUsers);

        // const sortedUsers = await User.find().sort({ age: -1 });
        // console.log("Sorted users by age:", sortedUsers);

        const countDocuments = await User.countDocuments({ isActive: false });
        console.log("Count of inactive users:", countDocuments);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExample();