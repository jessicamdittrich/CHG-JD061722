// EXPRESS RELATED VARIABLES
const express = require("express");
const noteRoute = require("./routes/notes.js");
const indexRoute = require("./routes/index.js");

// INITIALIZE EXPRESS
const app = express();

// ENVIRONMENT PORT & LOCAL PORT VARIABLE
const PORT = process.env.PORT || 3001;

// SETTING UP EXPRESS APPLICATION TO HANDLE DATA PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ADDED IN STATIC MIDDLEWARE FOR SERVING ASSETS IN PUBLIC FOLDER
app.use(express.static("public"));

app.use("/api", noteRoute);
app.use("/", indexRoute);

// CONFIRMING IN TERMINAL THAT CONNECTION IS WORKING
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
