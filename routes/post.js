const express = require("express");
const postRoute = express.Router();
const Post = require("../model/Post");
const authMiddleware = require("../middleware/auth");
const refreshToken = require("../middleware/refreshToken");
const uploadController = require("../controller/upload");
const fs = require('fs');

postRoute.get("", async (req, res) => {
    // console.log(req.error.message);
    try {
        const postData = await Post.find({ date: { $sort: 1 } });
        if (postData) {
            return res.status(200).json({
                status: "successful",
                // "token" : req.newToken,
                result: postData,
                accessToken: req.accessToken || false
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "failed",
        });
    }
});

postRoute.use('/createPost', uploadController)

postRoute.delete("/deletePost", (req, res) => { });
postRoute.put("/editPost", (req, res) => { });

module.exports = postRoute;
