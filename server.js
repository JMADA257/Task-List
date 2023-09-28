const express = require("express");
const path = require("path");
const uuid = require("./helpers/uuid");
const fsUtils = require("./helpers/fsUtils");
const notesData = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fsUtils.readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

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
