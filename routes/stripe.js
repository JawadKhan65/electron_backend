import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv"

dotenv.config()

const stripeRouter = express.Router()
const stripe = Stripe(process.env.STRIPE)

stripeRouter.post('/create-checkout-session', async (req, res) => {

    const CI = req.body.cartItems
    const line_items = CI.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.imageURL],
                    metadata: {
                        id: item.id
                    },
                },
                unit_amount: Math.round(item.totalPrice) * 100,
            },
            quantity: item.quantity
        }
    })
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `https://ecommerce-electron.vercel.app/checkout`,
            cancel_url: `https://ecommerce-electron.vercel.app/cart`,
        });

        res.send({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default stripeRouter
