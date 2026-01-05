const express = require("express");
const fetch = require("node-fetch");

// Create Express router
const router = express.Router();


// Home page
router.get("/", (req, res) => {
  res.render("index", { joke: null }); // pass default value
});


// Fetch joke from API
router.post("/fetch", async (req, res) => {
  const { type } = req.body;
  let categories = "Any";

  if (type) {
    categories = Array.isArray(type) ? type.join(",") : type;
  }

  const apiUrl = `https://v2.jokeapi.dev/joke/${encodeURIComponent(categories)}?type=single&blacklistFlags=nsfw,racist,sexist,explicit`;

  try {
    const apiRes = await fetch(apiUrl);
    if (!apiRes.ok) throw new Error(`API returned ${apiRes.status}`);
    const data = await apiRes.json();

    const joke = data.joke || "No joke found!";
    res.render("index", { joke });
  } catch (err) {
    console.error("Error fetching joke:", err);
    res.render("index", { joke: "Error fetching joke. Please try again." });
  }
});


//Saves joke to database
const Joke = require("../models/Joke"); 

router.post("/save", async (req, res) => {
  try {
    const jokeData = req.body;
    const newJoke = new Joke(jokeData);
    await newJoke.save();
    res.redirect("/favorites");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving joke");
  }
});



// Favorites page
router.get("/favorites", async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.render("favorites", { jokes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading favorites");
  }
});


module.exports = router;
