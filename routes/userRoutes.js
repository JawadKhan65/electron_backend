import express from "express";
import { body } from "express-validator"
import { fetchUser } from "../middlewares/fetchUser.js"
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
router.route("/deleteUser/:id").delete(fetchUser, deleteUser)

// Update Route
router.route("/updateProfile/:id", [
    body("password", "Enter valid password").exists(),

]).put(fetchUser, updateProfile)
router.route("/getUser/:id").post(fetchUser, getUser)

export default router