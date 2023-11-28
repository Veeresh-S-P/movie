// POST         /api/reviews/:movieId       This endpoint should allow users to add reviews for a specific movie identified by its ID. (Protected Route)  201
// GET          /api/reviews/:movieId       This endpoint should return all reviews for a specific movie identified by its ID.    200
// PUT/PATCH    /api/reviews/:reviewId      This endpoint should allow users to update the details of a specific review identified by its ID. (Protected Route)  204
// DELETE       /api/reviews/:reviewId      This endpoint should allow users to delete a specific review identified by its ID. (Protected Route)  202
// GET          /api/recommendations       This endpoint should return movie recommendations for the logged-in user based on their watched movies and reviews. (Protected Route)

const ReviewModel=require('../models/review.model')
const UserModel=require("../models/user.model")
const MovieModel=require('../models/movie.model')
const auth=require('../middlewares/auth.middleware')

const addReview=async(req,res)=>{
    try {
        const {movieId}=req.params
        const {userId, rating, comment}=req.body;

        const userExists=await UserModel.findById(userId)
        const movieExists=await MovieModel.findById(movieId)

        if(!userExists || !movieExists){
            return res.status(500).json({error:"internal err"})
        }
        const review=new ReviewModel({
            user:userId,
            movie:movieId,
            rating,
            comment,
            timestamp:new Date().getTime()
        })
        await review.save()
        res.status(200).json(review)
        
    } catch (error) {
        res.status(500).json({error:"internal err"})
    }
}

const getAllReviews=async (req,res)=>{
 try {
    
const {movieId}=req.params
const reviews=await ReviewModel.find({movie:movieId}).populate('user');
res.status(200).json({reviews})


 } catch (error) {
    res.status(500).json({error:"internal err"})
 }
}


const updateReview=async(req, res)=>{
    try{
        const {reviewId}=req.params
        const {rating, comment}=req.body
        const updateReview=await ReviewModel.findByIdAndUpdate(
            reviewId,
            {rating, comment},
            {new:true}
        )
        if(!updateReview){
            return  res.status(500).json({error:"internal err"})
        }

        res.send(200).send()
    }catch(error){
        res.status(500).json({error:"internal err"})
    }
}

const deleteReview=async(req,res) =>{
    try {
        const {reviewId}=req.params
        const deleteReview=await ReviewModel.findByIdAndDelete(reviewId)

        if(!updateReview){
            return  res.status(500).json({error:"internal err"})
        }

        res.send(200).send()

    } catch (error) {
        res.status(500).json({error:"internal err"})
    }
}



const generateRecommendations=(userReviews)=>{
    const recommendedMovies=userReviews
    .filter((review)=> review.rating>=3)
    .map((review)=>review.movie);

    return recommendedMovies
}

const getRecommendations=async(req, res) =>{
    try {
        const {userID}=req.body
const userReviews=await ReviewModel.find({user: userID}).populate('movie');
const recommendations=generateRecommendations(userReviews)

res.status(200).json({recommendations});

    } catch (error) {
        res.status(500).json({error:"internal err"})
    }
}

module.exports={
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
    getRecommendations
}