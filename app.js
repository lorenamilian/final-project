const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/index.js"); // same ("./models")
const routes = require("./routes");
const passport = require("./config/passport");
const session = require("express-session");

//start express app
const app = express();

// view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

// middeware
app.use(express.static("./public"));

//routing manager
app.use(routes);

db.sequelize.sync().then(function() {
  app.listen(rocess.env.PORT || 3000);
});
