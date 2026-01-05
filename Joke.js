const Joke = require("../models/Joke");

const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Joke", jokeSchema);
