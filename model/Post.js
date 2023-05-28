const { Schema , model, default: mongoose} = require('mongoose');

const postSchema = new Schema({

    name : {type : String, required : true},
    location : {type : String},
    likes : {type : Number , default : 0},
    postImage : {type : String},
    description : {type : String},
    date : {type : Date, required : true},
    postedBy : {type : mongoose.Schema.Types.ObjectId , required : true}
    
});

module.exports = model('Post' , postSchema);

/*
{name:"Siva",
location:"Bengaluru",
likes:64,
description: "Kick start your career",
PostImage: "relative path from local",
date: new Date(),
},
*/