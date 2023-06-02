const jwt = require("jsonwebtoken");
// const

const authMiddleware = async (req, res, next) => {
    console.log(req.cookies)
    const authHeader = req.headers.authorization;
    // console.log(req.cookies)
    if (authHeader) {
        const authToken = authHeader.split(" ")[1];
        //withut Bearer suffix
        if (!authToken)
            return res.status(401).json({ status: "provide valid token" });
        return jwt.verify(
            authToken,
            process.env.ACCESS_TOKEN_KEY,
            (err, decoded) => {
                // console.log(err)
                if (err) {
                    req.error = err;
                    next();
                } else {
                    req.userId = decoded.id;
                    req.error = false
                    next();
                }
                // req.newToken = jwt.sign(
                //     {
                //         id: decoded.id,
                //         email: decoded.email
                //     },
                //     process.env.ACCESS_TOKEN_KEY,
                //     { expiresIn: "15m" }
                //     )
            }
        );
    } else {
        //incase if there is node header
        res.status(400).json({
            status: "please provide authentication details",
        });
    }
};

module.exports = authMiddleware;
