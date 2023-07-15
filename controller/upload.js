const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const firebaseConfig = require("../config/fireBase");
const express = require("express");
const Post = require("../model/Post");
const uploadController = express.Router();

// Initialize Firebase
initializeApp(firebaseConfig);

//Intialize cloud storage and get a reference of the service
const storage = getStorage();

//setting up multer as a middle ware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

uploadController.post('', upload.single("postImage"), async (req, res) => {
    // console.log(true)
    try {
        const dateTime = giveCurrentDateTime();
        const storaheRef = ref(storage, `files/${req.file.originalname + "    " + dateTime}`);

        //create file metadata including the content type
        const metaData = {
            contentType: req.file.mimetype
        };

        //upload the file in the bucket storage
        const snapShot = await uploadBytesResumable(storaheRef, req.file.buffer, metaData);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        //grap public url
        const downloadURL = await getDownloadURL(snapShot.ref);

        const postData = req.body;
        if (downloadURL) {
            const post = new Post({
                name: postData.name,
                location: postData.location,
                postImage: downloadURL,
                description: postData.description,
                date: new Date(),
                // postedBy : 
            });

            const data = await post.save();
            if (data) {
                return res.status(201).json({
                    message: "success",
                    result: data,
                });
            }
            res.status(400).json({
                message: "failed",
            });
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ "message": err.message })
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = uploadController;
