// EXPRESS RELATED VARIABLES
const express = require("express");
const path = require("path");
const db = require("./db");

// INITIALIZE EXPRESS
const app = express();

// ENVIRONMENT PORT & LOCAL PORT VARIABLE
const PORT = process.env.PORT || 3001;

// SETTING UP EXPRESS APPLICATION TO HANDLE DATA PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ADDED IN STATIC MIDDLEWARE FOR SERVING ASSETS IN PUBLIC FOLDER
app.use(express.static("public"));

// GET ROUTE FOR NOTES PAGE X2
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET ROUTE FOR NOTES PAGE
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/notes", (req, res) => {
  db.readNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// //
// app.post('/api/notes', (req, res) => {

// });

// CONFIRMING IN TERMINAL THAT CONNECTION IS WORKING
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
