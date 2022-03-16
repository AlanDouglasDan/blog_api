import mongoose from 'mongoose';

const db = process.env.DB;

export default async function connectDB() {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB connected...');
  } catch (err) {
    console.error(err.message || 'MongoDB connection failed');
  }
}
