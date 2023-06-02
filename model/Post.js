const { Schema , model, default: mongoose} = require('mongoose');

const postSchema = new Schema({

    name : {type : String, required : true},
    location : {type : String},
    likes : {type : Number , default : 0},
    postImage : { type : String , required : true},
    description : {type : String, default : ""},
    date : {type : Date, required : true},
    // postedBy : {type : mongoose.Schema.Types.ObjectId , required : true}
    
});

module.exports = model('Post' , postSchema);