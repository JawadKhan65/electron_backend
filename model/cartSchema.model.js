import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    price: {
        required: true,
        type: Number,


    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        required: true,
        type: Number
    },
    status: {
        type: String,
        default: "Pending",
        required: true
    }
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart;