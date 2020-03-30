const mongoose = require("mongoose");

// SCHEMA SETUP
const gameSchema = new mongoose.Schema ({
  name: String,
  image: String,
  desc: String,
  // associate comments by adding reference to comment model
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Game", gameSchema);
