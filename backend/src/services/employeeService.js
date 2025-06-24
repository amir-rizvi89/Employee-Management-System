import Employee from '../models/Employee.js';

export const getAll = () => Employee.find();
export const getById = (id) => Employee.findById(id);
export const create = (data) => Employee.create(data);
export const update = (id, data) => Employee.findByIdAndUpdate(id, data, { new: true });
export const remove = (id) => Employee.findByIdAndDelete(id);
