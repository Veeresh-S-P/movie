const mongoose=require('mongoose')

const reviewSchema=mongoose.Schema({
    

    _id: ObjectId,
    user : { type: ObjectId, ref: 'User' },
    movie : { type: ObjectId, ref: 'Movie' },
    rating: Number,
    comment: String,
    timestamp: Date



})

const ReviewModel=mongoose.model("Review",reviewSchema)

module.exports={ReviewModel}