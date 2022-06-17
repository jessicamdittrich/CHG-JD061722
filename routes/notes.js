// EXPRESS & NPM
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("../helpers/uuid.js");
const db = require("../db/db.json");


const dataGet = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")) || [];

// INITIALIZE EXPRESS AS ROUTE
const noteRoute = express.Router();

// INPUTTING NOTED TO LEFT HAND SIDE USING "GET"
noteRoute.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, dataGet) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(dataGet);
  });
});

// SAVING NEW NOTES TO LEFT HAND SIDE USING "POST"
noteRoute.post("/notes", (req, res) => {

  console.info(`${req.body} request received to add a review`); // THIS IS SHOWING AS UNDEFINED
  
  // CREATING OBJECT ARRAY
  const { title, text } = req.body;

  // IF REQUIRED TITLE AND TEXT ARE PRESENT...
  if (title && text) {
    // NEW NOTE WITH REQUIREMENTS
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // OBTAIN EXISTING NOTES
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // CONVERTING STRING TO JSON OBJECT
        const parsedNotes = JSON.parse(data);

        // ADDING NEW NOTE
        parsedNotes.push(newNote);

        // WRITE NOTE TO DB.JSON FILE
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated reviews!")
        ); res.sendFile(path.join(__dirname, '../public/notes.html'))
      }
    });

    // ADVISING WHAT HAPPENED
    const response = {
      status: "success",
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }

});

module.exports = noteRoute;