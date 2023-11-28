require("dotenv").config()
const express=require("express");
const cors=require("cors");


const {connection}=require("./database/db");

const{userRoute}=require('./routes/user.routes')
const{movieRoute}=require('./routes/movie.routes')
const{reviewRoute}=require('./routes/review.routes')

const app=express()
app.use(express.json());
app.use(cors());


app.get("/",async(req,res)=>{
    return res.status(200).send({message:`Hello, this is the base endpoint!`})
})

app.use("/",userRoute)
app.use("/",movieRoute)
app.use("/",reviewRoute)





app.all("*",async(req,res)=>{
    return res.status(404).send("404 Route Not Found")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB Connected")
    } catch (error) {
        console.log(error.message)
    }

    console.log(`server is running on port ${process.env.port}`)
})