const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const mongoURL = 'mongodb://127.0.0.1:27017/boys';

mongoose.connect(mongoURL);

const userSchema = new mongoose.Schema({
    "email": String,
    "password": String,
})
const UserModel = mongoose.model('User', userSchema);


const traitSchema = new mongoose.Schema({
    "text": String,
    "points": Number
})
const TraitModel = mongoose.model('Trait', traitSchema);


const boySchema = new mongoose.Schema({
    "name": String,
    "score": Number,
    "traits": [traitSchema]
})
const BoyModel = mongoose.model('Boy', boySchema);


const listSchema = new mongoose.Schema({
    "editorIDs": [String],
    "boys": [boySchema]
})
const ListModel = mongoose.model('List', listSchema);


module.exports = { mongoose, UserModel, TraitModel, BoyModel, ListModel }