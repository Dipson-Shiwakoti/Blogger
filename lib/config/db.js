import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://dipsonshiwakoti:dipson1234@cluster0.nz8pic5.mongodb.net/blog-app')
}