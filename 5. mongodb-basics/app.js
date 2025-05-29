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
        //     name: 'Tahsin',
        //     email: 'tahsin@affpilot.com',
        //     age: 20,
        //     isActive: false,
        //     tags: ['Full Stack Engineer', 'Competitive Programmer', 'Speed Cuber']
        // });

        // await newUser.save();

        // console.log("Created new user", newUser);

        const allUser = await User.find({});
        console.log("All users:", allUser);

        const activeUsers = await User.find({ isActive: true });
        console.log("Active users:", activeUsers);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExample();