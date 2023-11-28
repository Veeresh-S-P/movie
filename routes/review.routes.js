const {Router}=require('express')
const reviewRoute=Router()

const {auth}=require('../middlewares/auth.middleware')
const {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
    getRecommendations
}    =  require('../controllers/review.controller')

reviewRoute.post("/reviews/:movieId", addReview)
reviewRoute.get("/reviews/:movieId", getAllReviews)
reviewRoute.put('/reviews/:reviewId', updateReview)
reviewRoute.delete('/reviews/:reviewId', deleteReview)
reviewRoute.get('/recommendations', getRecommendations)



module.exports={reviewRoute}