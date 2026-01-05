const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const jokesRouter = require("./routes/jokes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;


// All routes handled by jokes router
app.use("/", jokesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


mongoose.connect("mongodb://127.0.0.1:27017/jokesDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

