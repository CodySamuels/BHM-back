// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const app = express();
const db = require("./models");
const session = require('express-session')
const PORT = process.env.PORT || 3001;
const cors = require("cors");
require('dotenv').config();


// EXPRESS CONFIGURATION
// =====================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// CORS (CROSS-ORIGIN RESOURCE SHARING) SETUP
// =====================================================
// LOCAL TESTING
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

// DEPLOYED
// app.use(cors({
//     origin: ["https://cs-google-readinglist.herokuapp.com"],
//     credentials: true
// }))


// EXPRESS-SESSION
// =====================================================
// LOCAL TESTING
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7200000 }
}))

// DEPLOYED
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     proxy: true,
//     cookie: {
//       maxAge: 2 * 60 * 60 * 1000,
//       sameSite: "none",
//       secure: true
//     }
//   }))


// ROUTES
// =====================================================
const routes = require('./controllers/');
app.use('/', routes);

// HOME ROUTE
app.get("/", (req, res) => res.send("nothing to see here"))


// SEQUELIZE SYNC AND SERVER START
// =====================================================
const serverStart = async () => {
  await db.sequelize.sync({ force: true })
  await app.listen(PORT)
  console.log(`App listening on PORT: ${PORT}`)
  console.log('-------------------------------------------------------------------------------------')
}

serverStart()