const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

// TODO: add required properties
const LandingSchema = new Schema({
    Images: [{
        name: String,
        url: String
    }],
    Texts: [{
        type: String,
        required: true
    }],
    Links: [{
        type: String,
        required: true
    }],

    updatedAt:{type: String, default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") },
});

module.exports = mongoose.model('Landing', LandingSchema)