const middlewareObj = {};
const Game = require("../models/game");
const Comment = require("../models/comment");

// to check if user is authorized to edit/delete games
middlewareObj.ownsGame = function(req, res, next) {
  if(req.isAuthenticated()) {
    Game.findById(req.params.id, function(err, foundGame) {
      if(err) {
        res.redirect("back");
      } else {
        // does the games author id match the current user's id
        // need to use .equals() bc foundGame.author.id is an object (using .toString would also fix this)
        if(foundGame.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

// to check if user is authorized to edit/delete comments
middlewareObj.ownsComment = function(req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        // does the comments author id match the current user's id
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

// checks if user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = middlewareObj;
