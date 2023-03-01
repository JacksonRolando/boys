const jwt = require('jsonwebtoken')
const { isValidEmail } = require('../src/functions')
const { UserModel } = require('./mongoSetup')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12;



const signup = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const resJson = {
        success: false,
        errMsg: "AHHH! something went wrong 😭"
    }

    if (isValidEmail(email) === false) {
        resJson.errMsg = "Invalid Email"
        res.json(resJson)
    } else {
        const emailSearchRes = await UserModel.find({ 'email': email })

        if (emailSearchRes.length > 0) {
            resJson.errMsg = `Email: ${email} already exists`
            res.json(resJson)
        } else {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    console.warn(err)
                    res.json(resJson)
                }
                const newUser = new UserModel({
                    'email': email,
                    'password': hash
                })

                newUser.save(err => {
                    if (err !== null) {
                        console.warn(err);
                        res.json(resJson)
                    } else {
                        res.json({
                            success: true
                        })
                    }
                });
            })
        }
    }
}

module.exports = { signup }