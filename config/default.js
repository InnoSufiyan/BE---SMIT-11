import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        // Add a small delay before connecting
        await new Promise(resolve => setTimeout(resolve, 2000));
        const con = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s
        });
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};