import * as service from '../services/employeeService.js';

export const getEmployees = async (req, res) => {
  const employees = await service.getAll();
  res.json(employees);
};

export const getEmployee = async (req, res) => {
  const employee = await service.getById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Not found' });
  res.json(employee);
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await service.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  const updated = await service.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

export const deleteEmployee = async (req, res) => {
  const deleted = await service.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
