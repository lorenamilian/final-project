const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isAuthenticated");

//app routes

routes.get("/welcome", authenticate, function(req, res) {
  // query table recipes for all recipes
  db.Recipes.findAll({
    where: { userId: req.user.id }
  }).then(function(results) {
    console.log(results);
    res.render("welcome.ejs", { recipes: results, user: req.user });
  });
});

routes.get("/", function(req, res) {
  // console.log(req.user);
  res.render("sing-in.ejs");
});

// recipes page
routes.get("/recipes", function(req, res) {
  // query table recipes for all recipes
  db.Recipes.findAll({
    attributes: ["name", "diet", "description", "ingredients", "imge", "userID"]
  }).then(function(results) {
    // console.log(results);
    res.render("recipes.ejs", { recipes: results });
  });
});
// POST recipes create
routes.get("/create-recipes", function(req, res) {
  res.render("create-recipes.ejs");
});
// POST recipes create
routes.post("/create-recipes", authenticate, function(req, res) {
  db.Recipes.create({
    // aaron code here
    name: req.body.name,
    diet: req.body.diet,
    description: req.body.description,
    ingredients: req.body.ingredients,
    imge: req.body.imge,
    userID: req.user.id
  }).then(function(results) {
    // console.log(results);
    res.redirect("/recipes");
  });
});

//routes: user
//get login
routes.get("/login", function(req, res) {
  res.render("login.ejs");
});

//post login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login"
  })
);
//sign up
routes.get("/firth-page", function(req, res) {
  res.render("sing-in.ejs");
});

routes.get("/signup", function(req, res) {
  res.render("registration.ejs");
});

//post sign up
routes.post(
  "/user/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/welcome",
    failureRedirect: "/login"
  })
);

// get profile

routes.get("/profile", authenticate, function(req, res) {
  res.render("profile.ejs", { user: req.user });
});
routes.get("/active", authenticate, function(req, res) {
  res.render("being-active.ejs", { user: req.user });
});
routes.get("/badhabits", authenticate, function(req, res) {
  res.render("badhabits.ejs", { user: req.user });
});
routes.get("/badhabits", authenticate, function(req, res) {
  res.render("badhabits.ejs", { user: req.user });
});

routes.get("/map", function(req, res) {
  // console.log(req.user);
  res.render("map.ejs");
});

routes.get("/restaurants", function(req, res) {
  // console.log(req.user);
  res.render("restaurants.ejs");
});

// get logout
routes.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/firth-page");
});

module.exports = routes;
