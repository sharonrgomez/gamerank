var express = require("express");
var app = express();

app.set("view engine", "ejs"); // wihout this, need to type .ejs extension for every page

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/games", function(req, res) {
  var games = [
    {name: "Kingdom Hearts", image: "https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/4/3/7/2/2214372-box_khearts.png"},
    {name: "Kingdom Hearts II", image: "https://66.media.tumblr.com/_1500155367_cover.jpg"},
    {name: "Kingdom Hearts III", image: "https://m.media-amazon.com/images/M/MV5BYjlkMTc0ZmMtOTlhOC00YzE4LWJmN2UtOTQ1OTY2ZjNlZmM4XkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_.jpg"}
  ];

  res.render("games", {games:games});


});

app.listen(8000, "localhost", function() {
  console.log("gamerank server is running...");
});
