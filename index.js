import express from "express";
import connectToDb from "./db.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import router from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js";
import stripeRouter from "./routes/stripe.js";

const app = express()
const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is allowed
        const allowedOrigins = ['https://ecommerce-electron.vercel.app', 'https://another-allowed-origin.com'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

app.use("/api/auth", router)
app.use("/api/cart", cartRouter)
app.use("/stripe", stripeRouter)

connectToDb()
app.listen(process.env.PORT, () => {
    console.log("listening at 8000")
})
export default app;
