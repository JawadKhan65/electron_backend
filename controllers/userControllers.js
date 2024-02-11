import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import User from "../model/userSchema.model.js";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET


const SignUp = async (req, res) => {
    let success = false;
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success,
            errors: errors.array()
        })
    }

    try {

        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).json({
                success,
                errors: "User already exists"
            })
        }
        const saltinPass = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(req.body.password, saltinPass)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, secret, {
            expiresIn: "1h"
        })
        success = true
        return res.json({
            success,
            authToken: authToken,
            role: user.role,
            id: user.id

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            errors: "Internal Server Error",
            details: error.messsage
        })
    }
}


const Login = async (req, res) => {
    let success = false
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success,
            error: errors.array()
        })
    }
    try {

        const { email, password } = req.body

        const user = await User.findOne({
            email: email
        })
        if (!user) {
            res.status(400).json({
                success,
                errors: "Please Use Correct Credentials"
            })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            res.status(400).json({
                success,
                errors: "Please Use Correct Credentials"

            })

        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secret)
        success = true;

        return res.json({
            success,
            authToken: authToken,
            role: user.role,
            id: user.id

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const deleteUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({


            errors: errors.array()
        })
    }
    try {
        let user = User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("Not Found")

        }
        if (!user || !user._id || user._id.toString() !== req.params.id) {
            return res.status(401).send("Not Allowed")
        }
        user = await User.findByIdAndDelete(req.params.id)
        res.json({

            user: user
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
}

const updateProfile = async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({

            success,
            errors: errors.array()
        })
    }
    try {


        let user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                success,
                errors: "Not Found"
            })
        }
        if (!user || !user._id || user._id.toString() !== req.params.id) {
            return res.status(401).send("Not Allowed")
        }
        const saltinpass = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, saltinpass)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashedPass },
            { new: true }
        );

        // Check if the update actually changed anything
        if (!updatedUser) {
            return res.status(500).send("Update failed");
        }

        res.json({
            success,
            user: updatedUser
        })
    } catch (error) {
        res.status(500).send("Some error occurred");
    }

}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                errors: "User not found"
            });
        }
        const data = user
        return res.json({

            data
        });
    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            errors: "Internal Server Error"
        });
    }
};


export { SignUp, Login, deleteUser, updateProfile, getUser }
