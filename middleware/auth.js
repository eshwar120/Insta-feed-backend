const jwt = require('jsonwebtoken');
// const 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const authToken = authHeader.split(" ")[1];
        //withut Bearer suffix
        if(!authToken) return res.status(401).json({ "status" : "provide valid token"});
        return jwt.verify(
            authToken ,
            process.env.ACCESS_TOKEN_KEY,
            (err,decoded) => {
                if(err) return res.status(401).json({"status" : "unauthorized entry"});
                // console.log(decoded)
                req.userId = decoded.id;
                // req.newToken = jwt.sign(
                //     {
                //         id: decoded.id,
                //         email: decoded.email
                //     },
                //     process.env.ACCESS_TOKEN_KEY,
                //     { expiresIn: "15m" }
                //     )
                next();
            })
    }
    else {

        //incase if there is node header
        res.status(400).json({
            "status" : "please provide authentication details"
        })
    }
};

module.exports = authMiddleware;