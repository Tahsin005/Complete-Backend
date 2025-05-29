const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://asma35dhf:PMtvb842q3pLVQTr@cluster0.91yqb2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
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
        const newUser = await User({
            name: 'Ferdous',
            email: 'ferdous@affpilot.com',
            age: 20,
            isActive: true,
            tags: ['Full Stack Engineer', 'Competitive Programmer', 'Speed Cuber']
        });

        await newUser.save();

        console.log("Created new user", newUser);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExample();