// EXPRESS RELATED VARIABLES
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid");
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
  data.push(req.body);
  data.forEach((item, i) => {
    item.id = i + 1;
  });
  const dataString = JSON.stringify(data);
  fs.writeFile(path.join(__dirname, "../db/db.json"), dataString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  res.send(dataString);
});

module.exports = noteRoute;