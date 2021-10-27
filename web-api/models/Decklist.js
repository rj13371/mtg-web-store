const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

// TODO: add required properties
const DecklistSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref:('Event')
    },

    cardList: [{
        type: Object,
        ref: 'Card',
        required: true
    }],

    deckName:{type: String, required:true },

    record:{type: String, required:true },


    updatedAt:{type: String, default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") }


});

module.exports = mongoose.model('Decklist', DecklistSchema)