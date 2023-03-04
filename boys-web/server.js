const dotenv = require('dotenv');
const express = require('express');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');

// Configuring dotenv
dotenv.config();

const { signup } = require('./lib/auth')

const { mongoose, TraitModel, BoyModel, ListModel } = require('./lib/mongoSetup')
const { isValidEmail } = require('./src/functions')

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(bodyParser.json());

app.use(express.static('./build'))

app.post('/signup', async (req, res) => {
    signup(req, res)
})

app.listen(3000, () => {
    console.log("listening on 3000");
})

