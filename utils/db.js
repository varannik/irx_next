import mongoose from "mongoose"

const OPTIONS = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'QDF'
  
  };

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log(error)
    }
}