const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    _id: ObjectId,
    name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    watchedMovies: [{ type: ObjectId, ref: 'Movie' }],
    reviews: [{ type: ObjectId, ref: 'Review' }]
  },{
    versionKey:false,
    timestamps:true
  })

  const UserModel=mongoose.model("User",userSchema)

  module.exports={UserModel}
