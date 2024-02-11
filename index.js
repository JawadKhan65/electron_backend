<<<<<<< HEAD
const express = require("express")
const connectDB = require("./db")
const app = express()
const port = 8000
const cors = require("cors")
connectDB()

app.use(cors())

app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

=======
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
app.use("/api/auth", router)
app.use("/api/cart", cartRouter)
app.use("/api/stripe", stripeRouter)
connectToDb()
export default app;
>>>>>>> c4931808740bc6e2773cbdb27ede467e77ed3f0e
