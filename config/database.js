import mongoose from 'mongoose';
import env from 'dotenv';

const connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected ✅: ${connection.connection.host}`);
    } catch (error) {
        console.log(`⛔Error al conectar a la base de datos⛔: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
