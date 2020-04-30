const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// ---------------
//   GAME ROUTES
// ---------------

// (INDEX) display list of games from db
router.get("/games", function (req, res) {
  Game.find({}, function (err, allGames) {
    if (err) {
      req.flash("errorMsg", "Something went wrong.");
      res.redirect("/")
    } else {
      res.render("games/index", { games: allGames, page: 'games' });
    }
  });
});

// (NEW) display form to create new game
// **/games/new needs to come before /games/:id, bc /games/:id will override it
router.get("/games/new", middleware.isLoggedIn, function (req, res) {
  res.render("games/new", { page: "new" });
});

// (CREATE) get info from form input and add to db
router.post("/games", middleware.isLoggedIn, function (req, res) {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.desc;
  const price = req.body.price;
  const author = {
    username: req.user.username,
    id: req.user._id
  };
  const newGame = {
    name: name,
    image: image,
    desc: desc,
    price: price,
    author: author
  };
  Game.create(newGame, function (err, newlyCreatedGame) {
    if (err) {
      req.flash("errorMsg", "Something went wrong.");
      res.redirect("/games")
    } else {
      req.flash("successMsg", "Game created successfully.");
      res.redirect("/games");
    }
  });
});

// (SHOW) displays game info page
router.get("/games/:id", function (req, res) {
  //find the game with provided ID
  Game.findById(req.params.id).populate("comments").populate("reviews").exec(function (err, foundGame) {
    if (err || !foundGame) {
      req.flash("errorMsg", "Game not found.");
      res.redirect("/games");
    } else {
      res.render("games/show", { game: foundGame });
    }
  });
});

// (EDIT) display edit form
router.get("/games/:id/edit", middleware.ownsGame, function (req, res) {
  Game.findById(req.params.id, function (err, foundGame) {
    res.render("games/edit", { game: foundGame });
  });
});

// (UPDATE) submit edit form
router.put("/games/:id", middleware.ownsGame, function (req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body.game, function (err, updatedGame) {
    if (err) {
      req.flash("errorMsg", "Something went wrong.");
      res.redirect("/games/" + req.params.id);
    } else {
      req.flash("successMsg", "Game updated successfully.");
      res.redirect("/games/" + req.params.id);
    }
  });
});

// (DESTROY)
router.delete("/games/:id", middleware.ownsGame, function (req, res) {
  Game.findByIdAndDelete(req.params.id, function (err, removedGame) {
    if (err) {
      req.flash("errorMsg", "Something went wrong.");
      res.redirect("/games/" + req.params.id);
    } else {
      // delete all comments associated w deleted game
      Comment.deleteMany({ _id: { $in: removedGame.comments } }, function (err) {
        if (err) {
          req.flash("errorMsg", "Something went wrong.");
          res.redirect("/games/" + req.params.id);
        }
        req.flash("successMsg", "Game deleted successfully.");
        res.redirect("/games");
      });
    }
  });
});

module.exports = router;
