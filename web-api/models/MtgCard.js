const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MtgCardSchema = new Schema({
    // TODO: Copy Relevant Properties to Pokemon, YuGiOh Files
    colors: {
        // TODO: Research how enums are structured
        type: String,
        // JSON uses "", so we went with this, null is colorless
        enum: [null, "W", "U", "B", "R", "G"],
        default: null,
        required: true
    },
    mana_cost: {
        type: String,
        required: true
    },
    cmc: {
        type: Number,
        required: true
    },
    set_name: {
        type: String,
        required: true,
    },
    oracleText: {
        type: String,
        required: true, 
    },
    type_line: {
        // TODO: Is there a better way to structure this? Subtypes etc.
        type: String,
        required: true,
    },
    //changed small and normal to properties of imguri
    image_uris: {
        type: String,
        required: true,
        unique: true,
        small:"",
        normal:""
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true
    }
})

// - cardGame: string
//     - table: table
//     - colors: arr
//     - mana_cost: string
//     - cmc: int,
// - card_id: string
// - set_id: string
// - oracleText: string
// - oracle_id: string (=product_id for MTG Cards)
// - type_line: string
// - imageURI obj: {small(string): url(string) ; medium(string): url(string)}
// - stock: int
// - price: int

module.exports = mongoose.model('MtgCard', MtgCardSchema)