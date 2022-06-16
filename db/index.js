const fs = require("fs");
const uuidv4 = require("uuid");
const util = require("util");

const readAsync = util.promisify(fs.readFile);

class Notes {
  read() {
    return readAsync("db/db.json", "utf8");
  }

  readNotes() {
    return this.read().then((notes) => {
      let allNotes;
      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

//   writeNotes(note) {
//     const { title, text } = note;

//     const newNote = {
//       title,
//       text,
//       tip_id: uuidv4(),
//     };
//   }
}

module.exports = new Notes();
