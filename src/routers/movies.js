const express = require("express");
const {
 getMovies, getOneMovie, addMovie, updateMovie
} = require('../controllers/movies');

const router = express.Router();

router.get("/", getMovies)

router.get("/:titleOrId", getOneMovie)

router.post("/", addMovie)

router.put("/:id", updateMovie);

module.exports = router;
