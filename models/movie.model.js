
const mongoose=require('mongoose')
const { ObjectId } = mongoose.Schema.Types;


const movieSchema=new mongoose.mongoose.Schema({
    _id: ObjectId,
    title: String,
    genre: [String],
    releaseYear: Number,
    reviews: [{ type: ObjectId, ref: 'Review' }]
  })

  const MovieModel=mongoose.model("Movie",movieSchema)

  module.exports={MovieModel}

  