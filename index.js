const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  movies = require("./movies.json");
const { dirname } = require("path");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

//setiing Morgan
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));

//Morgan middleware error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error");
});

//GET request
app.get("/movies", (req, res) => {
  res.json(movies);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/documentation.html");
});

//Listening request post 8080
app.listen(8080, () => {
  console.log("Website started on port 8080");
});