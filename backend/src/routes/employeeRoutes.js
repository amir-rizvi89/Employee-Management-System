import express from 'express';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',  getEmployees); 
router.get('/:id', protect, getEmployee);
router.post('/', protect, createEmployee);
router.put('/:id', protect, updateEmployee);
router.delete('/:id', protect, deleteEmployee);

export default router;
