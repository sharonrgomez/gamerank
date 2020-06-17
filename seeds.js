const mongoose = require("mongoose");
const Game = require("./models/game");
const Comment = require("./models/comment");

const data = [
  {
    name: "Kingdom Hearts",
    image: "https://cnet4.cbsistatic.com/img/cVfPJbGQ6Z_2EVFWy8cCJ0y5TPo=/1092x0/2016/06/09/7f15e2e1-9935-40ae-93c7-df268d722bb8/promotionalartworkkh.png",
    desc: "Kingdom Hearts is a 2002 action role-playing video game developed and published by Square for the PlayStation 2 video game console. It is the first game in the Kingdom Hearts series and is the result of a collaboration between Square and The Walt Disney Company."
  },
  {
    name: "Kingdom Hearts II",
    image: "https://i.redd.it/8pouwoo2v4i21.png",
    desc: "Kingdom Hearts II is a 2005 action role-playing game developed and published by Square Enix for the PlayStation 2 video game console. The game is a sequel to Kingdom Hearts, and like the original game, combines characters and settings from Disney films with those of Square Enix's Final Fantasy series."
  },
  {
    name: "Kingdom Hearts III",
    image: "https://images-na.ssl-images-amazon.com/images/I/81mEtaB-9BL._AC_SL1500_.jpg",
    desc: "Kingdom Hearts III is a 2019 action role-playing game developed and published by Square Enix for the PlayStation 4 and Xbox One. It is the twelfth installment in the Kingdom Hearts series, and serves as a conclusion of the 'Dark Seeker Saga' story arc that began with the original game."
  },
  {
    name: "Kingdom Hearts",
    image: "https://cnet4.cbsistatic.com/img/cVfPJbGQ6Z_2EVFWy8cCJ0y5TPo=/1092x0/2016/06/09/7f15e2e1-9935-40ae-93c7-df268d722bb8/promotionalartworkkh.png",
    desc: "Kingdom Hearts is a 2002 action role-playing video game developed and published by Square for the PlayStation 2 video game console. It is the first game in the Kingdom Hearts series and is the result of a collaboration between Square and The Walt Disney Company."
  },
  {
    name: "Kingdom Hearts II",
    image: "https://i.redd.it/8pouwoo2v4i21.png",
    desc: "Kingdom Hearts II is a 2005 action role-playing game developed and published by Square Enix for the PlayStation 2 video game console. The game is a sequel to Kingdom Hearts, and like the original game, combines characters and settings from Disney films with those of Square Enix's Final Fantasy series."
  },
  {
    name: "Kingdom Hearts III",
    image: "https://images-na.ssl-images-amazon.com/images/I/81mEtaB-9BL._AC_SL1500_.jpg",
    desc: "Kingdom Hearts III is a 2019 action role-playing game developed and published by Square Enix for the PlayStation 4 and Xbox One. It is the twelfth installment in the Kingdom Hearts series, and serves as a conclusion of the 'Dark Seeker Saga' story arc that began with the original game."
  },
  {
    name: "Kingdom Hearts",
    image: "https://cnet4.cbsistatic.com/img/cVfPJbGQ6Z_2EVFWy8cCJ0y5TPo=/1092x0/2016/06/09/7f15e2e1-9935-40ae-93c7-df268d722bb8/promotionalartworkkh.png",
    desc: "Kingdom Hearts is a 2002 action role-playing video game developed and published by Square for the PlayStation 2 video game console. It is the first game in the Kingdom Hearts series and is the result of a collaboration between Square and The Walt Disney Company."
  },
  {
    name: "Kingdom Hearts II",
    image: "https://i.redd.it/8pouwoo2v4i21.png",
    desc: "Kingdom Hearts II is a 2005 action role-playing game developed and published by Square Enix for the PlayStation 2 video game console. The game is a sequel to Kingdom Hearts, and like the original game, combines characters and settings from Disney films with those of Square Enix's Final Fantasy series."
  },
  {
    name: "Kingdom Hearts III",
    image: "https://images-na.ssl-images-amazon.com/images/I/81mEtaB-9BL._AC_SL1500_.jpg",
    desc: "Kingdom Hearts III is a 2019 action role-playing game developed and published by Square Enix for the PlayStation 4 and Xbox One. It is the twelfth installment in the Kingdom Hearts series, and serves as a conclusion of the 'Dark Seeker Saga' story arc that began with the original game."
  }
]

function seedDB() {

  // remove all existing games/comments
  Game.deleteMany({}, function(err) {
    if(err){
      console.log(err);
    }
    Comment.deleteMany({}, function(err) {
      if(err) {
        console.log(err);
      }

      //add a few games
      data.forEach(function(seed) {
        Game.create(seed, function(err, game) {
          if(err) {
            console.log(err)
          } else {

            //create a comment for each game
            Comment.create(
              {
                text: "it took me weeks to beat this game :( it was so worth it tho, the ending is so unexpected",
                author: {
                  username: "purple_apple"
                }
              }, function(err, comment) {
                if(err) {
                  console.log(err);
                } else {
                  game.comments.push(comment);
                  game.save();
                }
              }
            );

          }
        });
      });
    });
  });
}

module.exports = seedDB;
