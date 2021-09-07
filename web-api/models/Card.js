const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardGame: {
        type: String,
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

module.exports = mongoose.model('Card', CardSchema)