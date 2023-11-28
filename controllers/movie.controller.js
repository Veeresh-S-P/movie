//GET /api/movies This endpoint should return a list of all available movies. 200
//GET /api/movies/:id  This endpoint should return the details of a specific movie identified by its ID. 200

const MovieModel=require('../models/movie.model')

const getAllMovies= async(req,res)=>{
    try {
        const movies=await MovieModel.find()
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({error:"internal eror"})
    }
};

const getMovieByID=async(req,res) =>{
    const movieId=req.params.id;
    try {
        const movie=await MovieModel.findById(movieId)
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(500).json({error:"internal eror"})
        }
    } catch (error) {
        res.status(500).json({error:"internal eror"})
    }
}

module.exports={
    getAllMovies,
    getMovieByID
}