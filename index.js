import express from "express";
import connectToDb from "./db.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import router from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js";
import stripeRouter from "./routes/stripe.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})
app.use("/auth", router)
app.use("/cart", cartRouter)
app.use("/stripe", stripeRouter)

connectToDb()
app.listen(process.env.PORT, () => {
    console.log("listening at 8000")
})
export default app;
