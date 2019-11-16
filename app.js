const express = require("express");
const bodyParser = require("body-parser");

//start express app
const app = express();

// view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// middeware
app.use(express.static("./public"));

const mainRoutes = require('./routes');
app.use(mainRoutes);
//routs


  app.listen(3004, function(err) {
    if (err) console.log(err);
    console.log("my server is running now");
  });
