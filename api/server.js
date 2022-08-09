// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model.js");

server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.find()
    .then((result) => res.json(result))
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((result) => {
      if (result == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  if (req.body.name == null || req.body.bio == null) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.insert(req.body)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.put("/api/users/:id", (req, res) => {
  if (req.body.name == null || req.body.bio == null) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.update(req.params.id, req.body)
      .then((result) => {
        if (result == null) {
          res.status(404).json({
            message: "The user with the specified ID does not exist",
          });
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((result) => {
      if (result == null) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
