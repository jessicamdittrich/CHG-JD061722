// EXPRESS RELATED VARIABLES
const express = require("express");
const path = require("path");
const db = require("../db");

// INITIALIZE EXPRESS
const indexRoute = express.Router();

// SET ROUTE FOR WILDCARD SO THAT ANYTHING ENTERED WILL RETURN TO INDEX.HTML
indexRoute.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = indexRoute;