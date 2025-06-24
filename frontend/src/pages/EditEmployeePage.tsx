import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchEmployeeById, updateEmp } from '../slices/employeeSlice'
import type { Employee } from '../slices/employeeSlice'

const EditEmployeePage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const employee = useAppSelector((state) =>
    state.emp.list.find((e) => e._id === id)
  )
  const loading = useAppSelector((state) => state.emp.loading)
  const error = useAppSelector((state) => state.emp.error)

  const [formData, setFormData] = useState<Employee | null>(null)

  useEffect(() => {
    if (!employee && id) {
      dispatch(fetchEmployeeById(id)).unwrap().then((emp) => {
        setFormData(emp)
      })
    } else if (employee) {
      setFormData(employee)
    }
  }, [dispatch, id, employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === 'salary' ? Number(value) : value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    dispatch(updateEmp(formData))
      .unwrap()
      .then(() => {
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error('Update error:', err)
      })
  }

  if (!formData) return <p>Loading employee data...</p>

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            name="designation"
            className="form-control"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            type="number"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Update'}
        </button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  )
}

export default EditEmployeePage
