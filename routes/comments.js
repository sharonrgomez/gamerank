const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// ----------------
//  COMMENT ROUTES
// -----------------

// (NEW) display form to add a new comment
router.get("/games/:id/comments/new", middleware.isLoggedIn, function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {game: game});
    }
  });
});

// (CREATE) submit comment form
router.post("/games/:id/comments", middleware.isLoggedIn, function(req, res) {
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

// (EDIT)
router.get("/games/:id/comments/:comment_id/edit", middleware.ownsComment, function(req,res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("comments/edit", {game_id: req.params.id, comment: foundComment});
    }
  });
});

// (UPDATE)
router.put("/games/:id/comments/:comment_id/", middleware.ownsComment, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/games/" + req.params.id);
    }
  });
});

// (DESTROY)
router.delete("/games/:id/comments/:comment_id/", middleware.ownsComment, function(req, res) {
  Comment.findByIdAndDelete(req.params.comment_id, function(err){
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/games/" + req.params.id);
    }
  });
});

module.exports = router;
