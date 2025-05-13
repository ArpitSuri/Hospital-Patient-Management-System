import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async ()=>{
   try {
    await mongoose.connect(process.env.MONGODB_URL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
   } catch (error) {
    console.log("Error in DB connection", error);
   }
}

export default dbConnection;