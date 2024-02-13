import { body } from "express-validator";
import express from "express";
import fetchuser from "../middlewares/fetchuser.js";
import { addToCart, adminOrders, deletefromCart, editOrderStatus, getItems } from "../controllers/cartControllers.js";
import { FetchRole } from "../middlewares/fetchDuplicate.js";
const cartRouter = express.Router()

cartRouter.route("/addtoCart", [
    body("name", "Must be something with name").exists(),
    body("price", "Enter Price").exists(),
    body("quantity", "Enter quantity").exists()
]).post(fetchuser, addToCart)

cartRouter.route("/getItems").post(fetchuser, getItems)
cartRouter.route("/deleteItem/:id").delete(fetchuser, deletefromCart)


// route where admin will be able to see orders

cartRouter.route('/orders').post(FetchRole, adminOrders)
cartRouter.route("/orders/edit/:id").put(FetchRole, editOrderStatus)
export default cartRouter