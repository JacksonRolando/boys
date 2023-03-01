const dotenv = require('dotenv');
const express = require('express');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto')

const mongoURL = 'mongodb://127.0.0.1:27017/boys';

// Configuring dotenv
dotenv.config();

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(bodyParser.json());

app.use(express.static('./build'))

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


const cryptoAlgorithm = 'aes-192-cbc'
const cryptoPass = process.env.CRYPTO_PASS

app.post('/signup', (req, res) => {
    const email = req.body.email
    const password = req.body.password


})

app.listen(3000, () => {
    console.log("listening on 5000");
})