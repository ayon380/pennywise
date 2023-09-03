import mongoose from 'mongoose';

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log('Using existing connection');
    return;
  }

  // Use new database connection
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    connection.isConnected = db.connections[0].readyState ===1 ;
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

export default connectDB;
