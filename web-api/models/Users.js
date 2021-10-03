const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    // 0: regular User, 1: Employee, 2: Admin
    authorization_level:{
        type: String,
        required: true
    },
    token:{
        type:String,
        required:true,
    }
});


module.exports = mongoose.model('User', UserSchema)