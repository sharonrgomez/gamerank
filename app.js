const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Game = require("./models/game");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/gamerank", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs"); // wihout this, need to type .ejs extension for every page
seedDB();

// display landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// (INDEX) display list of games from db
app.get("/games", function(req, res) {
  Game.find({}, function(err, allGames){
    if(err) {
      console.log(err);
    } else {
      res.render("games/index", {games:allGames});
    }
  });
});

// (NEW) display form to create new game
// **/new needs to come before /show, bc games/:id will override it
app.get("/games/new", function(req, res) {
  res.render("games/new");
});

// (CREATE) get info from form input and add to db
app.post("/games", function(req, res) {
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
app.get("/games/:id", function(req, res) {
  // find game with id (actually retrieving comment data, not just the id)
  Game.findById(req.params.id).populate("comments").exec(function(err, foundGame) {
    if(err) {
      console.log("Game not found.");
    } else {
      res.render("games/show", {game: foundGame});
    }
  });
});

// display form to add a new comment
app.get("/games/:id/comments/new", function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {game: game});
    }
  });
});

// submit form to add comment
app.post("/games/:id/comments", function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if(err) {
      console.log(err);
      res.redirect("/games");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          game.comments.push(comment);
          game.save();
          res.redirect("/games/" + game._id);
        }
      });
    }
  });
});

app.listen(8000, "localhost", function() {
  console.log("gamerank server is running...");
});
