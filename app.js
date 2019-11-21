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

app.get('/recipes', function (req, res) {
  res.render('recipes.ejs');
  
});

db.sequelize.sync().then(function() {
  app.listen(3002, function(err) {
    if (err) console.log(err);
    console.log("my server is running now");
  });
});
