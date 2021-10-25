
const cors = require('cors');
const exp = require('express');
const bp = require('body-parser');
const { success, error } = require('consola')
const { connect } = require('mongoose');
const cookieParser = require("cookie-parser");
const jwt = require('express-jwt')

// Bring in the app constants
const { DB, PORT } = require('./config')

// Initialize the application
const app = exp();

// Middlewares
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(bp.json());
app.use(bp.urlencoded(
    {extended:true}
));



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
const mtgCardsRoute = require('./routes/MtgCards');
const productsRoute = require('./routes/Products');
const usersRoute = require('./routes/Users');
const authRoute = require('./routes/Auth');
const orderRoute = require('./routes/Orders')
const landingRoute = require('./routes/Landing')
const decklistRoute = require('./routes/Decklist')
const eventRoute = require('./routes/Event')

startApp();



app.use ('/mtgcards', mtgCardsRoute);
app.use ('/products', productsRoute);
app.use ('/users', usersRoute);
app.use ('/auth', authRoute);
app.use ('/orders', orderRoute);
app.use ('/landingAssets', landingRoute);
app.use ('/decklist', decklistRoute);
app.use ('/event', eventRoute);