import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";


dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD', 'CONNECT', 'TRACE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://akashkrishnan616:281971@assignment-tracker-db.khjh2.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use(errorHandler);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  process.exit(1);
});
