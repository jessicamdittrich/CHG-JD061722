const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./develop/db/db.json');

const app = express();
const PORT = process.env.port || 3001;

// ADDED IN STATIC MIDDLEWARE FOR SERVING ASSETS IN PUBLIC FOLDER
app.use(express.static('./develop/public'));

// SETTING UP EXPRESS APPLICATION TO HANDLE DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TRANSFERS HTML FILE AT GIVEN PATH AND SETS THE HTTP HEADER FIELD
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// "GET"TING FROM JSON FILE
app.get('index.html', (req, res) => res.json(noteData));

//app.post

//app.delete

// CONFIRMING IN TERMINAL THAT CONNECTION IS WORKING
app.listen(PORT, () =>
    console.log(`listening at http://localhost:${PORT}`)
)