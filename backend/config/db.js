import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGOBD_CONNECTION_URL).then(() => console.log('DB connected'))
}