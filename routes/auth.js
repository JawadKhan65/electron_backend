const express = require("express")
const { Login, createUser, getUser } = require("../controllers/authControll");
const { fetchuser } = require("../middlewares/fetchuser");

const User = require("../models/Users.model")
const router = express.Router()
const { body } = require('express-validator');


router.route("/login", [

    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid password").exists()

]).post(Login)

router.route("/signup", [
    body("name", "Enter a valid name").isLength({
        min: 3
    }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid password").exists()
]).post(createUser)

router.route("/getuser", fetchuser).get(getUser)

module.exports = router