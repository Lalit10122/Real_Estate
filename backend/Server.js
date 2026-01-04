import express from 'express'
import connectDB from './config/mongoDB.js';
import dotenv from "dotenv";


// config
const app = express();
const port = process.env.PORT || 5000;
dotenv.config()

connectDB();


// middleware
app.use(express.json())



// api endpoints



app.get('/',(req,res)=>{
  res.send("api is working")
})

app.listen(port,()=>{
  console.log(`Server is started on port ${port}`)
})