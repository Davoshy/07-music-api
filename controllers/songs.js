const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  let queryObj = req.query;
  let key = Object.keys(queryObj)[0];
  let sqlName = key + "s";
  let value = req.query[key];
  let query = "";
  if (key) {
    query = `WHERE ${sqlName}.id = ${value}`;
  }
  db.query(
    `SELECT songs.id, songs.name, albums.name AS album, artists.name AS artist,
     genres.name AS genre, songs.audio FROM songs
     LEFT JOIN albums ON songs.album = albums.id
     LEFT JOIN artists ON songs.artist = artists.id
     LEFT JOIN genres ON songs.genre = genres.id
     ${query}`,
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
