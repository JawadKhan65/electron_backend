
// validation import 
// route logic
// tokenization

const User = require("../models/Users.model")
const { validationResult } = require("express-validator")
var jwt = require('jsonwebtoken');
const JWT_SECRET = "jawadisagoodboy" //will be in env soon
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success, errors: errors.array()
        })
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).json({
                success, error: "User with this id exists"
            })
        }
        //password hashing
        const saltCodeHash = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, saltCodeHash)
        //user creating
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,

        })
        const data = {
            user: {
                id: user.id
            }
        } //specific id
        //Tokenization for authentication

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })


    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            details: err.message,  // Add this line to provide more details about the error
        });
    }

}

const Login = async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success, errors: errors.array()
        })
    }
    const { email, password } = req.body
    const user = await User.findOne({ email: email });

    try {
        if (!user) {
            success = false
            return res.status(400).json({
                success,
                error: "Please login with correct credentials"

            })
        }
        const passwordComp = bcrypt.compare(password, user.password)
        if (!passwordComp) {
            success = false
            return res.status(400).json({
                success,
                error: "Please login with correct credentials"

            })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.send({ success, authToken })

    }
    catch (err) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}

const getUser = async (req, res) => {
    try {
        let userID = req.user.id
        const user = await user.findById(userID).select("-password")
    }
    catch (err) {
        res.status(500).send("some error occured")
    }
}

module.exports = { createUser, Login, getUser }

