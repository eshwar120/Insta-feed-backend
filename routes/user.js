const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');

userRoute.post('/register', async (req, res) => {

    const userData = req.body;
    try {
        if (userData) {
            const encryptedPassword = bcrypt.hashSync(userData.password, 15);
            const user = new User({
                name: userData.name,
                userName: userData.userName,
                email: userData.email,
                password: encryptedPassword
            });
            const data = await user.save();
            if (data) {
                return res.status(201).json({
                    "status": "user registered successfully",
                    "result": data
                })
            }
        }
        res.status(400).json({
            "status": "user registration failed"
        })
    }
    catch (err) {
        res.status(500).json({
            "status": "something went wrong"
        })
    }
});
userRoute.post('/login', async (req, res) => {

    const userData = req.body;
    //if no data provided
    if (!userData) return res.send(401).json({ "status": "authentication failed" });
    const userDataFromDB = await User.findOne({ email: userData.email });
    //if no such user exists
    if (!userDataFromDB) return res.send(404).json({ "status": "invalid credentials" });
    const result = await bcrypt.compare(userData.password, userDataFromDB.password);
    //if password isn't mactching
    if (!result) return res.send(401).json({ "status": "invalid credentials" });
    //generating access token
    try {
        const accessToken = await jwt.sign(
            {
                id: userDataFromDB._id,
                email: userDataFromDB.email
            },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "15m" }
            )
            // console.log(accessToken);
    
        //generating refresh token
        const refreshToken = await jwt.sign(
            {
                email: userDataFromDB.email,
                id: userDataFromDB._id
            },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: "1d" }
        );
    
        //saving refresh token to DB
        userDataFromDB.refreshToken.push(refreshToken);
        await userDataFromDB.save();
    
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    
        //send authToken back
        res.status(200).json({accessToken});
    }
    catch (err) {
        res.status(500).json({ "status" : err});
    }

});
userRoute.put('/editUser/:id', (req, res) => {


});
userRoute.get('/getUser/:id', (req, res) => {


});

module.exports = userRoute;