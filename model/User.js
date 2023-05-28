const { Schema , model, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    name : {type : String , required : true},
    userName : {type : String , unique : true , required : true},
    email : {type : String , unique : true , required : true},
    password : {type : String , required : true},
    followers : [{type : mongoose.Schema.Types.ObjectId}],
    following : [{type : mongoose.Schema.Types.ObjectId}],
    refreshToken : [{type : String}]
});

module.exports = model('User' , userSchema);