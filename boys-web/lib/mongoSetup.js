const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/boys';

mongoose.connect(mongoURL);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const traitSchema = new mongoose.Schema({
    text: String,
    points: Number
})

const boySchema = new mongoose.Schema({
    name: String,
    score: Number,
    traits: [traitSchema]
})

const listSchema = new mongoose.Schema({
    editorIDs: [String],
    boys: [boySchema]
})

module.exports = { mongoose, userSchema, traitSchema, boySchema, listSchema }