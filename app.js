const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/gamerank", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // wihout this, need to type .ejs extension for every page

const gameSchema = new mongoose.Schema ({
  name: String,
  image: String,
  desc: String
});

const Game = mongoose.model("Game", gameSchema);
//
// Game.create(
//   {
//     name: "Kingdom Hearts",
//     desc: "Kingdom Hearts is a 2002 action role-playing video game developed and published by Square Enix for the PlayStation 2 video game console.",
//     image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"
//   },
//   function(err, game){
//     if(err){
//       console.log("Something went wrong.");
//     } else {
//       console.log("Game added successfully:\n" + game);
//     }
//   }
// );


// const games = [
//   {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
//   {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
//   {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"},
//   {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
//   {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
//   {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"},
//   {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
//   {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
//   {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"}
// ];

// display landing page
app.get("/", function(req, res) {
  res.render("landing");
});

//display list of games from db
app.get("/games", function(req, res) {
  Game.find({}, function(err, allGames){
    if(err) {
      console.log(err);
    } else {
      res.render("games", {games:allGames});
    }
  });
});

// get info from form input and add to db
app.post("/games", function(req, res) {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.desc;
  const newGame = {name: name, image: image, desc: desc};
  Game.create(newGame, function(err, newlyCreatedGame){
    if(err){
      console.log(err);
    } else {
      res.redirect("/games");
    }
  });
});

// display form to create new game
// **/new needs to come first, bc games/:id will override it
app.get("/games/new", function(req, res) {
  res.render("new.ejs");
});

// displays game info page
app.get("/games/:id", function(req, res) {
  res.send("specified game page");
});

app.listen(8000, "localhost", function() {
  console.log("gamerank server is running...");
});
