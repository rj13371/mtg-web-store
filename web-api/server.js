
const cors = require('cors');
const exp = require('express');
const bp = require('body-parser');
const { success, error } = require('consola')
const { connect } = require('mongoose');
const { DB, PORT } = require('./config')

// Bring in the app constants


// const DB = process.env.APP_DB
// const PORT = process.env.APP_PORT
// const DB = "mongodb+srv://admin:CNoEcAmzHWsYXwCM@bastion.84pur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const PORT = 5000;

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

startApp();
