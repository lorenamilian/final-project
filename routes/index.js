const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isAuthenticated");

//routs

routes.get("/home", authenticate, function(req, res) {
  // console.log(req.user);
  db.Tasks.findAll({
    where: { userId: req.user.id }
  }).then(function(results) {
    res.render("welcome.ejs");
  });
});

//routes: user
//get login
routes.get("/user/login", function(req, res) {
  res.render("login.ejs");
});

//post login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/user/login"
  })
);
//sign up
routes.get("/firth-page", function(req, res) {
  res.render("sing-in.ejs");
});

routes.get("/user/signup", function(req, res) {
  res.render("registration.ejs");
});

//post sign up
routes.post(
  "/user/signup",
    passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/user/login"
  })
);

// get profile

routes.get("/profile", authenticate, function(req, res) {
  res.render("profile.ejs", { user: req.user });
});

// get logout
routes.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = routes;
