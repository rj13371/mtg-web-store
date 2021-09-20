require('dotenv').config({path:'../.env'})


module.exports = {
    SECRET: process.env.APP_SECRET,
    DB: process.env.APP_DB,
    PORT: process.env.PORT
}
