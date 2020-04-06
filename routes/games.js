const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

// ---------------
//   GAME ROUTES
// ---------------

// (INDEX) display list of games from db
router.get("/games", function(req, res) {
  Game.find({}, function(err, allGames){
    if(err) {
      console.log(err);
    } else {
      res.render("games/index", {games:allGames});
    }
  });
});

// (NEW) display form to create new game
// **/games/new needs to come before /games/:id, bc /games/:id will override it
router.get("/games/new", isLoggedIn, function(req, res) {
  res.render("games/new");
});

// (CREATE) get info from form input and add to db
router.post("/games", isLoggedIn, function(req, res) {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.desc;
  const author = {
    username: req.user.username,
    id: req.user._id
  };
  const newGame = {
    name: name,
    image: image,
    desc: desc,
    author: author
  };
  Game.create(newGame, function(err, newlyCreatedGame){
    if(err) {
      console.log("Something went wrong, game not created.");
    } else {
      res.redirect("/games");
    }
  });
});

// (SHOW) displays game info page
router.get("/games/:id", function(req, res) {
  // find game with id (actually retrieving comment data, not just the id)
  Game.findById(req.params.id).populate("comments").exec(function(err, foundGame) {
    if(err) {
      res.redirect("/games");
    } else {
      res.render("games/show", {game: foundGame});
    }
  });
});

// (EDIT) display edit form
router.get("/games/:id/edit", ownsGame, function(req, res) {
  Game.findById(req.params.id, function(err, foundGame) {
    res.render("games/edit", {game: foundGame});
  });
});

// (UPDATE) submit edit form
router.put("/games/:id", ownsGame, function(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body.game, function(err, updatedGame) {
    if(err) {
      console.log(err);
      res.redirect("/games");
    } else {
      res.redirect("/games/" + req.params.id);
    }
  });
});

// (DESTROY)
router.delete("/games/:id", ownsGame, function(req, res) {
  Game.findByIdAndDelete(req.params.id, function(err, removedGame) {
    if(err) {
      console.log(err);
    } else {
      // delete all comments associated w deleted game
      Comment.deleteMany( {_id: { $in: removedGame.comments } }, function(err) {
        if (err) {
          console.log(err);
        }
        res.redirect("/games");
      });
    }
  });
});

function ownsGame(req, res, next) {
  // first check if logged in
  if(req.isAuthenticated()) {
    Game.findById(req.params.id, function(err, foundGame) {
      if(err) {
        res.redirect("back");
      } else {
        // does user own the game?
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

// checks if user is logged in before allowing them access to certain pages/forms
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
