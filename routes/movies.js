const   express =   require('express'),
        router  =   express.Router(),
        Movie   =   require("../models/movie")


// Get all movies in /movies
router.get("/", async(req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

// GET specific movie
router.get("/:id", getMovie, (req, res) => {
    res.send(res.movie)
})

// POST movies to database
router.post("/", async(req, res) => {
    const movie = new Movie({
        movieDirector: req.body.movieDirector,
        movieTitle: req.body.movieTitle
    })
    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update the current item in the database
router.patch("/:id", getMovie, async(req,res) => {
    if(req.body.movieTitle != null ){
        res.movie.movieTitle = req.body.movieTitle
    }
    if(req.body.movieDirector != null ){
        res.movie.movieDirector = req.body.movieDirector
    }
    if(req.body.movieDate != null ){
        res.movie.movieDate = req.body.movieDate
    }

    try {
        const updatedMovie = await res.movie.save()
        res.json({ message: `You have updated ${updatedMovie.movieTitle}`})
    } catch (error) {
        res.status(400).json({ message: "Movie not updated"})
    }
})

// Delete items from the database
router.delete("/:id", getMovie, async(req, res) => {
    try {
        await res.movie.remove()
        res.json({ message: "Deleted Movie" })
    } catch (error) {
        res.status(500).json({ message: "could not find movie" })
    }
})


// Middleware = confirm movie exists in the database, or let the user know it is not found
async function getMovie(req, res, next) {
    let movie
    try {
        movie = await Movie.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({ message: "Cannot find movie."})
        }
    } catch (error) {
        return res.status(500).json({ message: "The ID selected was not found."})
    }
    res.movie = movie
    next()
}


module.exports = router