import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from "ioredis";
import { rateLimit } from 'express-rate-limit'
import { connectDB } from "./config/default.js";
import { authRoutes } from "./routes/auth.js";
import { jobAdRoutes } from "./routes/jobAd.js";
import { createRateLimiter } from "./middleware/rate-limit.js";
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import { usersRoutes } from "./routes/user.js";
// import './cronJob.js'

const PORT = 8000;

const app = express();

export const redis = new Redis({
    host: '',
    port: '',
    password: '',
});

redis.on("connect", () => {
    console.log("Redis is connected");
});

redis.on('close', () => {
    console.log('Connection closed');
});

redis.on('error', (err) => {
    console.error('Error with Redis:', err);
});

app.use(helmet());

dotenv.config();
app.use(cors({
    origin: '*'
}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());

connectDB();

// Apply the rate limiting middleware to all requests.


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/jobAd", createRateLimiter(1 * 60 * 1000, 40, "Too much job request hit, please try again after a minute"), jobAdRoutes);

app.get("/", (request, response) => {
    response.send("Hello World");
});


app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});