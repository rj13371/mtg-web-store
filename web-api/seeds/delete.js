
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


const seedDb = async () => {


    //uncomment to reset DB if you want
   // await MtgCard.deleteMany({});

   //removes unneeded properties, comment/uncomment the props u need removed

//    await MtgCard.updateMany({}, [{ $unset: ["object"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["mtgo_foil_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["tcgplayer_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["cardmarket_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["released_at"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["scryfall_uri"] }])

//    await MtgCard.updateMany({}, [{ $unset: ["layout"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["highres_image"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["keywords"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["legalities"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["foil"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["nonfoil"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["finishes"] }])

//    await MtgCard.updateMany({}, [{ $unset: ["oversized"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["promo"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["reprint"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["variation"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["set_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["set"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["set_type"] }])

//    await MtgCard.updateMany({}, [{ $unset: ["set_uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["set_search_uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["scryfall_set_uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["rulings_uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["prints_search_uri"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["collector_number"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["digital"] }])

//    await MtgCard.updateMany({}, [{ $unset: ["card_back_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["artist_ids"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["illustration_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["border_color"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["frame"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["full_art"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["textless"] }])

//    await MtgCard.updateMany({}, [{ $unset: ["booster"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["story_spotlight"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["edhrec_rank"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["related_uris"] }])

// await MtgCard.updateMany({}, [{ $unset: ["games"] }])
// await MtgCard.updateMany({}, [{ $unset: ["reserved"] }])
// await MtgCard.updateMany({}, [{ $unset: ["image_status"] }])
// await MtgCard.updateMany({}, [{ $unset: ["preview"] }])


//    await MtgCard.updateMany({}, [{ $unset: ["oracle_id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["id"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["multiverse_ids"] }])
//    await MtgCard.updateMany({}, [{ $unset: ["lang"] }])

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