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

//routs







/*
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.post("/welcome", function(req, res) {
  console.log(req.body.taskItem);
  list.push(req.body.taskItem);
  res.render("main.ejs", { list: list });
});
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});*/

  app.listen(3004, function(err) {
    if (err) console.log(err);
    console.log("my server is running now");
  });
