const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

// ----------------
//  COMMENT ROUTES
// -----------------

// (NEW) display form to add a new comment
router.get("/games/:id/comments/new", isLoggedIn, function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {game: game});
    }
  });
});

// (CREATE) submit comment form
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

// (EDIT)
router.get("/games/:id/comments/:comment_id/edit", ownsComment, function(req,res) {
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
router.put("/games/:id/comments/:comment_id/", ownsComment, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/games/" + req.params.id);
    }
  });
});

// (DESTROY)
router.delete("/games/:id/comments/:comment_id/", ownsComment, function(req, res) {
  Comment.findByIdAndDelete(req.params.comment_id, function(err){
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/games/" + req.params.id);
    }
  });
});

function ownsComment(req, res, next) {
  // first check if logged in
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        // does user own the comment?
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

// checks if user is logged in before allowing them access to certain pages/forms
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
