const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

// TODO: add required properties
const EventSchema = new Schema({
    name:{type: String, required:true },
    description:{type: String, required:true },

    updatedAt:{type: String, default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") },
    dateAndTime:{type: String, required:true },
    isFinished:{type: Boolean, default: false },
    entrants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        hasPaid: false
    }],
    decklists: [{
        type: Schema.Types.ObjectId,
        ref: 'Decklist',
    }],
});

module.exports = mongoose.model('Event', EventSchema)