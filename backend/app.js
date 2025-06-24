import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Parse JSON
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
