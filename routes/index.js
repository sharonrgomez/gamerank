const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// display landing page
router.get("/", function(req, res) {
  res.render("landing");
});

// -------------
//  AUTH ROUTES
// -------------

// display sign up form
router.get("/signup", function(req, res) {
  res.render("signup", {page: "signup"});
});

// handle signup logic
router.post("/signup", function(req, res) {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      req.flash("errorMsg", err.message + ".");
      return res.redirect("signup");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("successMsg", "Account created successfully. Welcome, " + user.username + "!");
      res.redirect("/games");
    })
  });
});

// display log in form
router.get("/login", function(req, res) {
  res.render("login", {page: "login"});
});

// handle login logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/games",
  successFlash: "successMsg",
  failureRedirect: "/login",
  failureFlash: "errorMsg"
}));

// logout route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("successMsg", "You have been logged out.");
  res.redirect("/games");
});

module.exports = router;
