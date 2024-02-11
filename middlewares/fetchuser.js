const jwt = require("jsonwebtoken")
const JWT_SECRET = "jawadisagoodboy";


const fetchuser = (req, res, next) => {

    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({
            error: "Please authenticate with valid token"
        })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()

    }
    catch (err) {
        res.status(401).send({
            error: "some error occured"
        })
    }
}

export default fetchuser