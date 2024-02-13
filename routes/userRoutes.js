import express from "express";
import { body } from "express-validator"
import fetchuser from "../middlewares/fetchuser.js"
import { Login, SignUp, deleteUser, getUser, updateProfile } from "../controllers/userControllers.js"
const router = express.Router()


// SingUp route
router.route("/signup", [
    body("name", "Enter valid name").isLength({
        min: 3
    }),
    body("email", "Enter valid email").isEmail(),
    body("phone", "Enter valid Phone Number").exists(),
    body("password", "Enter valid password").exists(),

]).post(SignUp)


// Login Route
router.route("/login", [

    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").exists(),

]).post(Login)


// Delete Route
router.route("/deleteUser/:id").delete(fetchuser, deleteUser)

// Update Route
router.route("/updateProfile/:id", [
    body("password", "Enter valid password").exists(),

]).put(fetchuser, updateProfile)
router.route("/getUser/:id").post(fetchuser, getUser)

export default router