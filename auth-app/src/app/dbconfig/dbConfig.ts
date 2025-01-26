import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export async function connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI!,{})

      const connection = mongoose.connection;

      connection.on('connected', () => {
        console.log('Connected to the database');
      });
      connection.on('error', console.error.bind(console, 'connection error:'));
        

    } catch (error) {
        console.log('Error connecting to the database');
        console.log(error);
    }
}