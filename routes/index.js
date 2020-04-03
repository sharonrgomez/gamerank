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
  res.render("signup");
});

// handle signup logic
router.post("/signup", function(req, res) {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/games");
    })
  });
});

// display log in form
router.get("/login", function(req, res) {
  res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/games",
  failureRedirect: "/login"
}));

// logout route
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/games");
});

// checks if user is logged in before allowing them access to certain pages/forms
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
