const prisma = require('../utils/prisma');

const getMovies = async (req, res) => {
let gotMovies

    if(req.query.runtimeMins) {
const lessThan = await prisma.movie.findMany({ 
    where : {
        runtimeMins : {
            lt: Number(req.query.runtimeMins)
        }
    },
    include: { 
    screenings: true
    }
})

const greaterThan = await prisma.movie.findMany({ 
        where : {
            runtimeMins : {
                gt: Number(req.query.runtimeMins)
            }
        },
        include: { 
            screenings: true
            }
        })

    gotMovies = {less: lessThan,
        more: greaterThan}
    }


    else{
    gotMovies = await prisma.movie.findMany({ 
    include: { 
    screenings: true
    }
})
}

res.json({ data: gotMovies } )
}

const getOneMovie = async (req, res) => {
const titleOrId = req.params.titleOrId

}

const addMovie = async (req, res) => {
    const {
        title,
        runtimeMins,
        screenId,
        startsAt
    } = req.body;

    const sameName = await prisma.movie.findMany({
        where: {
            title: title
          }
    })

    if(sameName.length !== 0) {
        res.json({ error: "Film with same name already exists in database"})
        return
    }

    const newMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
            screenings: {
                create: {
                    screenId,
                    startsAt
                }
            }
        },
        include: { 
            screenings: true
        }
})

    res.json({ data: newMovie });
}

module.exports = {
    getMovies,
    getOneMovie,
    addMovie
};
