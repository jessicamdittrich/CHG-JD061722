// EXPRESS RELATED VARIABLES
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// LINKING JSON FILE WHERE DATA IS STORED AND PULLED FROM
const noteData = require('./develop/db/db.json');

// INITIALIZE EXPRESS
const app = express();

// ENVIRONMENT PORT & LOCAL PORT VARIABLE
const PORT = process.env.port || 3001;

// ADDED IN STATIC MIDDLEWARE FOR SERVING ASSETS IN PUBLIC FOLDER
app.use(express.static('./develop/public'));

// SETTING UP EXPRESS APPLICATION TO HANDLE DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TRANSFERS HTML FILE AT GIVEN PATH AND SETS THE HTTP HEADER FIELD
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});*/

// GET ROUTE FOR HTML PAGE
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

// GET ROUTE FOR NOTES PAGE
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'notes.html'))
);

// INITIALIZING NEW VARIABLE FOR EXPRESS ROUTER
const notes = require('express').Router();

// 
notes.get('notes.html', (req, res) => {
    readFromFile('./develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

//
notes.post('notes.html', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            tip_id: uuid(),
        };

        readAndAppend(newNote, noteData);
        res.json('Note added successfully');
    } else {
        res.error('Error adding in note...');
    }
});

// CONFIRMING IN TERMINAL THAT CONNECTION IS WORKING
app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
)