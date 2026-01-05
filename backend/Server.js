import express from 'express'
import connectDB from './config/mongoDB.js';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import propertyRouter from './routes/property.route.js';
import connectCloudinary from './config/cloudinary.js';


// config
dotenv.config()
const app = express();
const port = process.env.PORT || 8000;

connectDB();
connectCloudinary();

// middleware
app.use(express.json())
// app.use(cors())


// api endpoints
app.use('/api/user',userRouter)
app.use('/api/properties',propertyRouter)


app.get('/',(req,res)=>{
  res.send("api is working")
})

app.listen(port,()=>{
  console.log(`Server is started on port ${port}`)
})