const middlewareObj = {};
const Game = require("../models/game");
const Comment = require("../models/comment");
const Review = require("../models/review");

// to check if user is authorized to edit/delete games
middlewareObj.ownsGame = function (req, res, next) {
  if (req.isAuthenticated()) {
    Game.findById(req.params.id, function (err, foundGame) {
      if (err || !foundGame) {
        req.flash("errorMsg", "Game not found.");
        res.redirect("back");
      } else {

        // does the games author id match the current user's id
        // need to use .equals() bc foundGame.author.id is an object (using .toString would also fix this)
        if (foundGame.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("errorMsg", "You don't have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("errorMsg", "You need to be logged in to do that.");
    res.redirect("back");
  }
}

// to check if user is authorized to edit/delete comments
middlewareObj.ownsComment = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err || !foundComment) {
        req.flash("errorMsg", "Comment not found.");
        res.redirect("back");
      } else {
        // does the comments author id match the current user's id
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("errorMsg", "You don't have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("errorMsg", "You need to be logged in to do that.");
    res.redirect("back");
  }
}

middlewareObj.checkReviewOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Review.findById(req.params.review_id, function (err, foundReview) {
      if (err || !foundReview) {
        res.redirect("back");
      } else {
        if (foundReview.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("errorMsg", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("errorMsg", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkReviewExistence = function (req, res, next) {
  if (req.isAuthenticated()) {
    Game.findById(req.params.id).populate("reviews").exec(function (err, foundGame) {
      if (err || !foundGame) {
        req.flash("errorMsg", "Game not found.");
        res.redirect("back");
      } else {
        // check if req.user._id exists in foundGame.reviews
        var foundUserReview = foundGame.reviews.some(function (review) {
          return review.author.id.equals(req.user._id);
        });
        if (foundUserReview) {
          req.flash("errorMsg", "You already wrote a review.");
          return res.redirect("/games/" + foundGame._id);
        }
        // if the review was not found, go to the next middleware
        next();
      }
    });
  } else {
    req.flash("errorMsg", "You need to login first.");
    res.redirect("back");
  }
};

// checks if user is logged in
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("errorMsg", "You need to be logged in to do that.");
  res.redirect("/login");
}

module.exports = middlewareObj;
