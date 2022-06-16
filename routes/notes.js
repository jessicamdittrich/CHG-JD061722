// EXPRESS RELATED VARIABLES
const express = require("express");
const path = require("path");
const db = require("../db");
const noteFunctions = require("../db/index")

// INITIALIZE EXPRESS AS ROUTE
const noteRoute = express.Router();

// SET ROUTE FOR NOTES PAGE
noteRoute.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// FUNCTION???
// noteRoute.get("/api/notes", (req, res) => {
//   db.readNotes()
//     .then((notes) => {
//       return res.json(notes);
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = noteRoute;