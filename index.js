import express from "express";
import connectToDb from "./db.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import router from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js";
import stripeRouter from "./routes/stripe.js";

const app = express()
app.use(cors({
    origin: ["https://ecommerce-electron.vercel.app"],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true
}))
app.use(express.json())
app.use("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})
app.use("/api/auth", router)
app.use("/api/cart", cartRouter)
app.use("/api/stripe", stripeRouter)

connectToDb()
export default app;
