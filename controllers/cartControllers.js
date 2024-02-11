import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import Cart from "../model/cartSchema.model.js"
import User from "../model/userSchema.model.js"
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.secret

const addToCart = async (req, res) => {
    const { price, quantity, name } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {


        const Item = new Cart({
            user: req.user.id,
            price: price,
            name: name,
            quantity: quantity
        })
        const savedItem = await Item.save()
        console.log(savedItem)
        return res.status(200).json({
            savedItem,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Errors")
    }



}

const getItems = async (req, res) => {
    try {
        const items = await Cart.find({ user: req.user.id })
        return res.json({
            items
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Some Error")
    }
}
const deletefromCart = async (req, res) => {
    try {

        let item = await Cart.findById(req.params.id)
        if (!item) {
            return req.status(404).json({
                error: "Not Found"
            })
        }
        if (item.user !== req.user.id) {
            return res.status(401).send("Not allowed")

        }
        item = await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).send(item)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Some Error Occured")

    }
}

const adminOrders = async (req, res) => {
    try {
        const allOrders = await Cart.find().lean();
        res.json(allOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const editOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        // Check if the cart item exists
        const existingCartItem = await Cart.findById(id);
        if (!existingCartItem) {
            return res.status(404).json({
                error: "Item Not Found"
            });
        }

        // Update the status of the cart item
        const updatedCartItem = await Cart.findByIdAndUpdate(id, {
            status: "Completed",
        }, {
            new: true
        });

        // Send a response with the updated cart item
        res.json({
            message: "Status updated successfully",
            cartItem: updatedCartItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


export { addToCart, getItems, deletefromCart, adminOrders, editOrderStatus }
