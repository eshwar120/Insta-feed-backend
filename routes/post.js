const express = require('express');
const postRoute = express.Router();
// const postSchema = require('../model/Post');
const Post = require('../model/Post');
const authMiddleware = require('../middleware/auth');

postRoute.get('',authMiddleware, async (req, res) => {

    try {
        const postData = await Post.find({ date: { $sort: 1 } });
        if (postData) {
            return res.status(200).json({
                "status": "successful",
                // "token" : req.newToken,
                "result": postData
            })
        }
    }
    catch (err) {
        res.status(500).json({
            "status": "failed"
        })
    }
});

postRoute.post('/createPost',authMiddleware, async (req, res) => {
    const postData = req.body;
    // console.log(postData)
    if (postData) {
        try {
            // console.log(postData)
            const post = new Post({
                name: postData.name,
                location: postData.location,
                likes: postData.likes,
                postImage: postData.postImage,
                description: postData.description,
                date: new Date(),
                postedBy : req.userId
            });
            const data = await post.save();
            if (data) {
                return res.status(201).json({
                    "status": "success",
                    // "token" : req.newToken,
                    "result": data
                })
            }
            res.status(400).json({
                "status": "failed",
            })
        }
        catch (err) {
                res.status(500).json({
                    "status": "failed"
                })
            }
        }
    else {
            res.status(500).json({
                "status": "failed"
            })
        }
    });

postRoute.delete('/deletePost', (req, res) => {

});
postRoute.put('/editPost', (req, res) => {

});

module.exports = postRoute;