var express = require("express"),
  router = express.Router();
const { response } = require("express");
const path = require("path");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

router
  .get("/notes", (req, res) => {
    res.json(db);
    // returns all the notes we currently know about
  })

  .post("/notes", (req, res) => {
    if (req.body && req.body.title && req.body.text) {
      let id = uuidv4();

      let note = {
        title: req.body.title,
        text: req.body.text,
        id: id,
      };

      db.push(note);

      fs.writeFileSync("./db/db.json", JSON.stringify(db));

      let response = {
        status: "success",
        data: note,
      };

      res.send(response);
    } else {
      res.json("Request body must at least contain a product name");
    }
  })

  .delete("/notes/:noteId", (req, res) => {
    res.json({
      term: "api",
      description:
        "An application programming interface, is a computing interface that defines interactions between multiple software intermediaries",
    });
  });

module.exports = router;
