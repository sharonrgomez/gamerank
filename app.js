var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set("view engine", "ejs"); // wihout this, need to type .ejs extension for every page

app.get("/", function(req, res) {
  res.render("landing");
});

var games = [
  {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
  {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
  {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"},
  {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
  {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
  {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"},
  {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
  {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
  {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"}
];

app.get("/games", function(req, res) {
  res.render("games", {games:games});
});

app.post("/games", function(req, res) {
  // get info from form input and add to games array
  var name = req.body.name;
  var image = req.body.image;
  var newGame = {name: name, image: image};
  games.push(newGame);
  res.redirect("/games");
});

app.get("/games/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(8000, "localhost", function() {
  console.log("gamerank server is running...");
});
