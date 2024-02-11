import { body } from "express-validator";
import express from "express";
import { fetchUser } from "../middlewares/fetchUser.js";
import { addToCart, adminOrders, deletefromCart, editOrderStatus, getItems } from "../controllers/cartControllers.js";
import { FetchRole } from "../middlewares/fetchDuplicate.js";
const cartRouter = express.Router()

cartRouter.route("/addtoCart", [
    body("name", "Must be something with name").exists(),
    body("price", "Enter Price").exists(),
    body("quantity", "Enter quantity").exists()
]).post(fetchUser, addToCart)

cartRouter.route("/getItems").post(fetchUser, getItems)
cartRouter.route("/deleteItem/:id").delete(fetchUser, deletefromCart)


// route where admin will be able to see orders

cartRouter.route('/orders').post(FetchRole, adminOrders)
cartRouter.route("/orders/edit/:id").put(FetchRole, editOrderStatus)
export default cartRouter