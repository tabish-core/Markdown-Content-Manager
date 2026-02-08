// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const connectDB = () => {
  console.log("Supabase Client Initialized");
};

//MONGO_URI=mongodb://127.0.0.1:27017/test
//PORT=5000
