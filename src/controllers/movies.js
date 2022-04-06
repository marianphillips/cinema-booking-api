const { movie } = require("../utils/prisma");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const whereClauses = {
    runtimeMins: {},
    screenings: {
        some: {
            startsAt: {
            gte: new Date()
            }
          },
        }
    }

  if (req.query.runtimeGreater) {
    whereClauses.runtimeMins.gt = parseInt(req.query.runtimeGreater);
  }
  if (req.query.runtimeLess) {
    whereClauses.runtimeMins.lt = parseInt(req.query.runtimeLess);
  }

  const gotMovies = await prisma.movie.findMany({
    where: whereClauses,
    include: {
      screenings: {
          where : {
            startsAt: {
                gte: new Date()
                }
          }
      },
    },
  });

  res.json({ data: gotMovies });
};

const getOneMovie = async (req, res) => {
  const titleOrId = req.params.titleOrId;

  const id = parseInt(titleOrId);

  let specificMovie;

  if (id) {
    const usingId = await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });
    specificMovie = usingId;
  } else {
    const usingTitle = await prisma.movie.findMany({
      where: {
        title: titleOrId,
      },
    });
    specificMovie = usingTitle[0];
  }

  if (!specificMovie) {
    res.json({ error: "Movie does not exist in database" });
  } else {
    res.json({ data: specificMovie });
  }
};

const addMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const movieData = {
    title: title,
    runtimeMins: runtimeMins,
  };

  if (req.body.screenings) {
    let screeningsToCreate = [];
    for (const screening of req.body.screenings) {
      screeningsToCreate.push({
        startsAt: new Date(Date.parse(screening.startsAt)),
        screenId: screening.screenId,
      });
    }
    movieData.screenings = {
      create: screeningsToCreate,
    };
  }

  const sameName = await prisma.movie.findMany({
    where: {
      title: title,
    },
  });

  if (sameName.length !== 0) {
    res.json({ error: "Film with same name already exists in database" });
    return;
  }

  const newMovie = await prisma.movie.create({
    data: movieData,
    include: {
      screenings: true,
    },
  });

  res.json({ data: newMovie });
};

const updateMovie = async (req, res) => {

    const checkMovie = await prisma.movie.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
    
      if (!checkMovie) {
        res.json({ error: "Movie does not exist" })
        return;
      }
    
  let updatedMovieData = {};

  if (req.body.title) {
    updatedMovieData.title = req.body.title;
  }

  if (req.body.runtimeMins) {
    updatedMovieData.runtimeMins = req.body.runtimeMins;
  }

  if (req.body.screenings) {
    let screeningsToUpdate = [];
    for (const screening of req.body.screenings) {
      screeningsToUpdate.push({
        where: { id: 9 },
        data: {
          startsAt: new Date(Date.parse(screening.startsAt)),
          screenId: screening.screenId,
        },
      });
    }
    updatedMovieData.screenings = {
      update: screeningsToUpdate,
    };
  }


  const updatedMovie = await prisma.movie.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: updatedMovieData,
    include: {
      screenings: true,
    },
  });
  res.json({ data: updatedMovie });
};

module.exports = {
  getMovies,
  getOneMovie,
  addMovie,
  updateMovie,
};
