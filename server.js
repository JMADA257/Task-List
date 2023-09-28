//pulling express
const express = require("express");
//pulling the path method from node
const path = require("path");
//pulling uuid using a relative path
const uuid = require("./helpers/uuid");
//pulling fsutils from a relative path
const fsUtils = require("./helpers/fsUtils");
//pulling in the possible route of notesdata using relative path
const notesData = require("./db/db.json");
//setting up a port for a port for heroku and localhost to use
const PORT = process.env.PORT || 3001;
//the variable app now is linked to all the express methods
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//setting the base home page http://localhost:3001/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//setting the base home page http://localhost:3001/notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//setting the base home page http://localhost:3001/api/notes
app.get("/api/notes", (req, res) => {
  fsUtils.readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

//setting the base home page http://localhost:3001/api/notes
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const userNote = {
    title: title,
    text: text,
    id: uuid(),
  };
  fsUtils.readAndAppend(userNote, "./db/db.json");
  console.log(userNote);
  res.json("Note was added");
});

// app.delete("/api/notes/:id", (req, res) => {
//   fsUtils.deleteAndAppend(req.params.id, "./db/db./json");
//   res.json("Note was deleted!");
// });

app.listen(PORT, () => {
  console.log(`Example app listenening at http://localhost:${PORT}`);
});
