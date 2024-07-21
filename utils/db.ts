import mongoose from 'mongoose';


const mongoURI: string = process.env.MONGO_URI  || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {

      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      connectTimeoutMS: 10000 // Timeout after 10 seconds if not connected

    });
    console.log('MongoDB Connected...');
    return mongoose.connection.db;

  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
};
