import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoUrl);
        console.log("MongoDb connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;