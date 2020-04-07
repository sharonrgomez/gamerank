const mongoose = require("mongoose");

// SCHEMA SETUP
const gameSchema = new mongoose.Schema ({
  name: String,
  image: String,
  price: String,
  desc: String,
  // associate users by adding reference to user model
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },


  // associate comments by adding reference to comment model
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Game", gameSchema);
