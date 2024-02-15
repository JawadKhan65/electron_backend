import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config()

const secret = process.env.SECRET

const FetchRole = (req, res, next) => {
    // fetch token
    const role = req.header("role")
    console.log(role)
    const token = req.header("authToken")
    if (!token) {
        return res.status(404).json({
            error: "Unauthorized Access"
        })
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);

        // Check if the role in the decoded token is "admin"
        if (role !== "admin") {
            return res.status(403).json({
                error: "Forbidden: Access denied",
            });
        }

        // If everything is valid, proceed to the next middleware or route handler
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid token or token expired",
        });
    }
}
export { FetchRole }