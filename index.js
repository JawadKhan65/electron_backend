import express from "express";
import connectToDb from "./db.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import router from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js";
import stripeRouter from "./routes/stripe.js";

const app = express()


app.use(
    cors({
        origin: "*", // Allow requests from any origin
        methods: ["POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())

app.use("/api/auth", router)
app.use("/api/cart", cartRouter)
app.use("/api/stripe", stripeRouter)

connectToDb()
app.listen(process.env.PORT, () => {
    console.log("listening at 8000")
})
export default app;
