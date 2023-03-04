const jwt = require('jsonwebtoken')
const { isValidEmail } = require('../src/functions')
const { UserModel, RefreshTokenModel } = require('./mongoSetup')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12;

const signup = async (req, res) => {
    const { email, password } = req.body

    const resJson = {
        success: false,
        errMsg: "AHHH! something went wrong 😭"
    }

    if (isValidEmail(email) === false) {
        resJson.errMsg = "Invalid Email"
        return res.json(resJson)
    } else {
        const emailSearchRes = await UserModel.find({ 'email': email })

        if (emailSearchRes.length > 0) {
            resJson.errMsg = `A user with that email already exists`
            return res.json(resJson)
        } else {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    console.warn(err)
                    return res.json(resJson)
                }

                const newUser = new UserModel({
                    'email': email,
                    'password': hash
                })

                newUser.save(async (err, savedUser) => {
                    if (err !== null) {
                        console.warn(err);
                        return res.json(resJson)
                    } else {

                        const { accessToken, refreshToken } = genTokens({
                            id: savedUser._id,
                            email: savedUser.email,
                        })

                        try {
                            await RefreshTokenModel.save({ token: refreshToken })

                            await sendRefreshCookie(refreshToken, res)

                            return res.json({
                                success: true,
                                accessToken: accessToken
                            })
                        } catch (e) {
                            console.warn(e)
                            res.json(resJson)
                        }
                    }
                });
            })
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    const resJson = {
        success: false,
        errMsg: "AHHH! something went wrong 😭"
    }

    if (isValidEmail(email) === false) {
        resJson.errMsg = "Invalid Email"
        return res.json(resJson)
    } else {
        const emailSearchRes = await UserModel.find({ 'email': email })

        if (emailSearchRes.length <= 0) {
            resJson.errMsg = "Incorrect Email or Password"
            return res.json(resJson)
        } else {
            const savedUser = emailSearchRes[0]
            const match = await bcrypt.compare(password, savedUser.password)
            if (match === false) {
                resJson.errMsg = "Incorrect Email or Password"
                return res.json(resJson)
            } else if (match === true) {
                const { accessToken, refreshToken } = genTokens({
                    id: savedUser._id,
                    email: savedUser.email,
                })

                try {
                    await RefreshTokenModel.save({ token: refreshToken })

                    await sendRefreshCookie(refreshToken, res)

                    return res.json({
                        success: true,
                        accessToken: accessToken
                    })
                } catch (e) {
                    console.warn(e)
                    res.json(resJson)
                }
            }
        }
    }
}

const genTokens = (user) => {
    const accessToken = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10s'
    })

    const refreshToken = jwt.sign({
        id: user.id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '5m'
    })

    return { accessToken, refreshToken }
}

const sendRefreshCookie = (refreshToken, res) => {
    return res.cookie('refreshToken', refreshToken, {
        httponly: true,
        strict: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 3
    })
}

module.exports = { signup }