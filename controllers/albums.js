const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query(
    `SELECT albums.id AS id, albums.name AS name, artists.name AS artist, albums.cover AS cover FROM albums
    LEFT JOIN artists ON artists.id = albums.artist`,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  db.query(
    `SELECT albums.id AS id, albums.name AS name, artists.name AS artist, albums.cover FROM albums
    LEFT JOIN artists ON albums.artist = artists.id
    WHERE albums.id=${req.params.id}`,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
});

module.exports = router;
