import express from 'express';
import { body } from 'express-validator';
import { Login, createUser, getUser } from '../controllers/authControll.js';
import fetchUser from '../middlewares/fetchuser.js';
import User from '../models/Users.model.js';

const router = express.Router();

router.route('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid password').exists(),
]).post(Login);

router.route('/signup', [
    body('name', 'Enter a valid name').isLength({
        min: 3,
    }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid password').exists(),
]).post(createUser);

router.route('/getuser').get(fetchuser, getUser);

export default router;
