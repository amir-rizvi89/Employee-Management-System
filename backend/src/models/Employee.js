import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee; 
