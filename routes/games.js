const express = require("express");
const router = express.Router();
const Game = require("../models/game");

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
  const newGame = {
    name: name,
    image: image,
    desc: desc
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
      console.log("Game not found.");
    } else {
      res.render("games/show", {game: foundGame});
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
