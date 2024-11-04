import Mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {} from "./routes/users"
dotenv.config();

const app = express()

app.use(express.json());
app.use(cors());


Mongoose.connect(process.env.MONGO_URL);

app.listen(3001, () => console.log('Server Started!'));