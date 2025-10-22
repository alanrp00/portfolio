import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("API Portfolio running 🚀"));

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
