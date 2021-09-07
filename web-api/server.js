
const cors = require('cors');
const exp = require('express');
const bp = require('body-parser');
const { success, error } = require('consola')
const { connect } = require('mongoose');

// Bring in the app constants
const { DB, PORT } = require('./config')

// Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());

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

//ROUTES

// const usersRoute = require('./routes/user');
const mtgCardsRoute = require('./routes/mtgCards');
// const productsRoute = require('./routes/products');

startApp();

app.use ('/mtgcards', mtgCardsRoute);
