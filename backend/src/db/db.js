import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo DB connected:', connectionInstance.connection.host);
    } catch (error) {
        console.log('Error while connecting Mongo DB E:', error);
    }
};

export default connectDB;