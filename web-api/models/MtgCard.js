const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// added color type to check for MTG colors in regex , returns a split array of the string
const regex = /[WURGB]+/

class Color extends mongoose.SchemaType {
    constructor(key, options) {
      super(key, options, 'Color');
    }
    
  
    // `cast()` takes a parameter that can be anything. You need to
    // validate the provided `val` and throw a `CastError` if you
    // can't convert it.
    cast(string) {

        let value = String(string);

      if (regex.test(value)){
      return value.split('')
    }else{
        throw new Error('color: ' + value +
        ' is not a valid color');
    
    }
    }
  }

  mongoose.Schema.Types.Color = Color;

const MtgCardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // TODO: Copy Relevant Properties to Pokemon, YuGiOh Files
    colors: {
        type: Color,
        required:true
    },
    mana_cost: {
        type: String,
        required: true
    },
    cmc: {
        type: Number,
        required: true
    },
    //Had to add power and toughness, non creatures do not have this property
    power: {
        type: String,
        required: false
    },
    toughness: {
        type: String,
        required: false
    },
    set_name: {
        type: String,
        required: true,
    },
    //removed required, some cards do not have oracle text
    oracleText: {
        type: String,
    },
    type_line: {
        type: String,
        required: true,
    },
    //changed small and normal to properties of imguri, changed syntax to correct format
    image_uris: {
        small: { type: String },
        normal:{ type: String }
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number
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