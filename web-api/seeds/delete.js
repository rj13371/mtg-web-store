
const mongoose = require('mongoose');
const MtgCard = require('../models/MtgCard') //MODEL
const { success, error } = require('consola')


const { connect } = require('mongoose');

// Bring in the app constants
const { DB,PORT } = require('../config')

const startApp = async () => {
    try {
        console.log(DB, PORT)
        // Connecion With DB
        await connect(DB);
        success({ 
            message: `Successfully connected with the Database /n${DB}`, 
            badge: true
        });
        app.listen(PORT, () => 
            success({message: `Server started on PORT ${PORT}`, badge: true})
        );


    } catch(err) {
        error({
            message: `Unable to connected to with Database /n${error}`,
            badge: true
        })
    }
}

startApp();

const propsToRemove = [
    "object",
    "mtgo_foil_id",
    "tcgplayer_id",
    "cardmarket_id",
    "released_at",
    "uri",
    "scryfall_uri",
  "layout",
  "highres_image",
  "keywords",
  "legalities",
  "foil",
  "nonfoil",
  "finishes",
  "oversized",
  "promo",
  "reprint",
  "variation",
  "set_id",
  "set",
  "set_type",
  "set_uri",
  "set_search_uri",
  "scryfall_set_uri",
  "rulings_uri",
  "prints_search_uri",
  "collector_number",
  "digital",
  "card_back_id",
  "artist_ids",
  "illustration_id",
  "border_color",
  "frame",
  "full_art",
  "textless",
  "booster",
  "story_spotlight",
  "edhrec_rank",
  "related_uris",
  "games",
  "reserved",
  "image_status",
  "preview",
  "id",
  "multiverse_ids",
  "lang",
  "price"
  ];


const seedDb = async () => {


    //uncomment to reset DB if you want
   // await MtgCard.deleteMany({});

   //removes unneeded properties, comment/uncomment the props u need removed

   for (let i = 0;i<propsToRemove.length;i++){
    await MtgCard.updateMany({}, [{ $unset: [propsToRemove[i]] }])
   // await MtgCard.updateMany({}, [{ $set: {image_uris: "https://c1.scryfall.com/file/scryfall-cards/small/front/e/e/ee766f7b-4e9c-442d-bf53-31c204646449.jpg?1562162476"} }])
   }

}

seedDb().then(() => {
    mongoose.connection.close();
})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connection open')
// });



// EXAMPLE TEMPLATE

// const newMtgCard = new MtgCard({
//     name:"",
//     colors: "",
//     mana_cost: "",
//     cmc: 1,
//     set_name: "",
//     oracleText: "",
//     type_line: "",
//     image_uris: {
//         small:"",
//         normal:""
//     },
//     stock: 0,
//     price: 0
// })