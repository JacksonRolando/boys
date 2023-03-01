const dotenv = require('dotenv');
const express = require('express');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const { userSchema, traitSchema, boySchema, listSchema } = require('./lib/mongoSetup')

// Configuring dotenv
dotenv.config();

const app = express();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(bodyParser.json());

app.use(express.static('./build'))


const cryptoAlgorithm = 'aes-192-cbc'
const cryptoPass = process.env.CRYPTO_PASS

app.post('/signup', (req, res) => {
    const email = req.body.email
    const password = req.body.password


})

app.listen(3000, () => {
    console.log("listening on 5000");
})