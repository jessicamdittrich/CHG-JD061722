// EXPRESS RELATED VARIABLES
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("../helpers/uuid");
const db = require("../db/db.json");
const util = require("util");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")) || [];

// INITIALIZE EXPRESS AS ROUTE
const noteRoute = express.Router();

noteRoute.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

noteRoute.post("/notes", (res, req) => {
  
  const { title, text } = req.body || {};

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    // Obtain existing reviews
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          '../db/db.json',
          JSON.stringify(parsedNotes),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }

});

module.exports = noteRoute;