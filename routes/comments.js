const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

// ----------------
//  COMMENT ROUTES
// -----------------

// display form to add a new comment
router.get("/games/:id/comments/new", isLoggedIn, function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {game: game});
    }
  });
});

// submit comment form
router.post("/games/:id/comments", isLoggedIn, function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
      res.redirect("/games");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          game.comments.push(comment);
          game.save();
          res.redirect("/games/" + game._id);
        }
      });
    }
  });
});

// checks if user is logged in before allowing them access to certain pages/forms
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
