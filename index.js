const express = require('express');
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const bodyPraser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const multer = require('multer');
const postData = require('./routes/post');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const uploadController = require('./controller/upload');
require('dotenv').config();
express();

//using port variable from env - which hosting address
const PORT = process.env.PORT || 3000;

//creating app from express
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

//using body-parser
app.use(bodyPraser.urlencoded({extended : false}));
app.use(bodyPraser.json());
app.use(bodyParserErrorHandler());

//using cookie-parser
app.use(cookieParser());

//using cors
app.use(cors());

//connect to database
connectDB();

// const storage = multer.diskStorage ({
//     destination : (req, file, cb) => {
//         cb(null , '/uploads');
//     },
//     filename : (req, file , cb) => {
//         cb(null , `${file.originalname} - ${new Date()}`);
//     }
// });

// app.use('/posts/createPost' , uploadController)
app.use('/posts', postRoute);
app.use('/users' , userRoute);

//evrything outside what our routes can handle will come to this route
app.use('/*' , (req,res) => {
    res.status(404).json({
        "status" : "not found"
    })
});

//checking for DB connection
mongoose.connection.once('open' , () => {
    console.log("connected to DB");

    //launching the server only when we successfully connected t DB
    app.listen(PORT , () => {
        console.log(`server is running on ${PORT}`);
    });
});

// module.exports = {
//     upload
// }