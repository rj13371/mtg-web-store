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
    uniqueString:{
        type: String,
        required: true
    },
    isValid:{
        type: Boolean,
        required: true
    },
    // 0: regular User, 1: Employee, 2: Admin
    authorization_level:{
        type: String,
        required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref:('Order')
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref:('Event')
    }],
    decklists: [{
        type: Schema.Types.ObjectId,
        ref:('Decklist')
    }]
});


module.exports = mongoose.model('User', UserSchema)