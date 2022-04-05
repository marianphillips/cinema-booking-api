const express = require("express");
const {
 getMovies, getOneMovie, addMovie
} = require('../controllers/movies');

const router = express.Router();

router.get("/", getMovies)

router.get("/:titleOrId", getOneMovie)

router.post("/", addMovie)

module.exports = router;
