const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardGame: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Card', CardSchema)