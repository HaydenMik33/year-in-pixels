const express = require("express");
const app = express();
app.use(express.static(`${__dirname}/../build`));
const path = require("path");
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});
require("dotenv").config();
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
// console.log(__dirname);
const {
  strat,
  logout,
  getUser,
  newIlgi,
  getIlgi,
  deleteAll
} = require(`${__dirname}/controllers/authCtrl`);
const {
  addPixel,
  getAllPixels,
  getPixel,
  updatePixel
} = require(`${__dirname}/controllers/pixelCtrl`);

const { addColor, updateColor } = require(`${__dirname}/controllers/colorCtrl`);
const {
  getQuote,
  addQuote,
  getAllQuotes,
  getQuoteById
} = require(`${__dirname}/controllers/quoteCtrl`);
const { searchPhoto } = require(`${__dirname}/controllers/unsplashCtrl`);
const port = process.env.PORT || 3001;

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  // console.log(user);
  app
    .get("db")
    .getUserByAuthid(user.id)
    .then(response => {
      console.log(user.id);
      if (!response[0]) {
        app
          .get("db")
          .addUserByAuthid([user.id, user.displayName, user.picture])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

// AUTH ENDPOINTS

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/home",
    failureRedirect: "http://localhost:3000/#/"
  })
);
app.get("/logout", logout);
app.get("/api/me", getUser);
app.post("/api/ilgi", newIlgi);
app.get("/api/ilgi/:id", getIlgi);
app.delete("/api/ilgi/:ilgi_id", deleteAll);

// PIXEL ENDPOINTS
app.post("/api/pixel", addPixel);
app.get("/api/pixels/:ilgi_id", getAllPixels);
app.get("/api/pixel/:id", getPixel);
app.post("/api/pixel/:ilgi_id/:id", updatePixel);

// color endpoints

app.post("/api/color", addColor);
app.post("/api/color/:id", updateColor);
/////quote
app.get("/api/quote", getQuote);
app.get("/api/quote/:id", getQuoteById);
app.post("/api/quote", addQuote);
app.get("/api/quotes/:id", getAllQuotes);

app.get("/api/photos/:id", searchPhoto);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
