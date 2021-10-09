
const cors = require('cors');
const exp = require('express');
const bp = require('body-parser');
const { success, error } = require('consola')
const { connect } = require('mongoose');
const cookieParser = require("cookie-parser");
const csrfProtection = require('csurf')
const jwt = require('express-jwt')

// Bring in the app constants
const { DB, PORT, JWTSECRET } = require('./config')

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

app.use(jwt({
    secret: JWTSECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      } else if(req.cookies.token)
      return req.cookies.token ;
    }
  }));

//   const csrfProtection = csrf({
//     cookie: true
//   });
//   app.use(csrfProtection);
//   app.get('/csrf-token', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
//   });  

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
const authRoute = require('./routes/Auth')

startApp();

app.use ('/mtgcards', mtgCardsRoute);
app.use ('/products', productsRoute);
app.use ('/users', usersRoute);
app.use ('/auth', authRoute);