import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import propertyRouter from "./routes/property.route.js";
import connectCloudinary from "./config/cloudinary.js";

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 8081; // Align default with frontend API_URL

connectDB();
connectCloudinary();

// middleware
app.use(cors()); // Allow frontend to call the API across origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for FormData text fields)

app.get("/api/users/direct-test", (req, res) => {
  console.log("Direct route test successful");
  res.json({ message: "Direct route works!" });
});

// api endpoints
app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
  console.log(`✅ User routes registered at /api/users`);
});
