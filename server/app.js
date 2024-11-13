
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import dotenv from 'dotenv';


dotenv.config(); 


console.log("MongoDB URL:", process.env.mongoDB_URL);


if (!process.env.mongoDB_URL) {
  console.error('MongoDB URL not found in environment variables!');
  process.exit(1); 
}

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.mongoDB_URL, {
  useNewUrlParser: true,      
  useUnifiedTopology: true,    
  serverSelectionTimeoutMS: 5000, 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


import otpRoutes from './routes/otpRoutes.js'; 
app.use('/api/otp', otpRoutes); 


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
