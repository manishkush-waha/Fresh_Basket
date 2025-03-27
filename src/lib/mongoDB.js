import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please provide MONGODB_URI in the .env file"
  )
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
async function connectDB() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create a new connection promise
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Store the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    // Wait for connection to be established
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise
    cached.promise = null;
    throw e;
  }

  console.log("Database Connection successful...");
  return cached.conn;
}

export default connectDB;

