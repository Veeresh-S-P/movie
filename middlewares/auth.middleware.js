require("dotenv").config()
const {UserModel}=require("../models/user.model");

const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    const token=req.headers.token;
    if(token){
        try {
           
           
           let  decodedToken = jwt.verify(token, process.env.accesstoken);
           
           req.body.userID=decodedToken.userID;
           req.body.isAdmin = decodedToken.isAdmin
                next()
        } catch (error) {
            res.status(400).send({"error":error.message})
        }
    }else{
        return res.status(400).send({ "success":false,"error": "please login first" })
    }

}



module.exports={auth}