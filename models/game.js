const mongoose = require("mongoose");

// SCHEMA SETUP
const gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  desc: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
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
  ],
  // reviews and ratings, allows us to get average rating
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Game", gameSchema);
