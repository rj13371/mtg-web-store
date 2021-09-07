
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

        const newMtgCard = new MtgCard({
            name:"Kraken Hatchling",
            colors: "U",
            mana_cost: "{U}",
            cmc: 1,
            power:"0",
            toughness:"4",
            set_name: "Jumpstart: Historic Horizons",
            oracleText: "",
            type_line: "Creature — Kraken",
            image_uris: {
                small:"test",
                normal:"test"
            },
            stock: 10,
            price: 0.50
        })

    await newMtgCard.save();
    
}

seedDb().then(() => {
    mongoose.connection.close();
})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connection open')
// });



// EXAMPLE TEMPLATE TO ADD CARD

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