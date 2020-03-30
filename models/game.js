const mongoose = require("mongoose");

// SCHEMA SETUP
const gameSchema = new mongoose.Schema ({
  name: String,
  image: String,
  desc: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Game", gameSchema);
