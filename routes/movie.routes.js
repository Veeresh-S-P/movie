const {Router}=require('express')
const movieRoute=Router()

const {auth}=require('../middlewares/auth.middleware')
const { getAllMovies,getMovieByID}=require('../controllers/movie.controller')

movieRoute.get("/movies", getAllMovies)
movieRoute.get("/movies/:id", getMovieByID)

module.exports={movieRoute}