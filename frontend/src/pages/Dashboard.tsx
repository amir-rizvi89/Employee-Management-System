import React, {useEffect} from 'react'
import { Table, Button, Container, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchEmps, deleteEmp } from '../slices/employeeSlice'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { list, loading } = useAppSelector(s => s.emp)

  const nav = useNavigate()

  useEffect(() => { dispatch(fetchEmps()) }, [dispatch])
  const handleLogout = () => {
    dispatch(logout());
    console.log('Logged out. Token now:', localStorage.getItem('token'))
    nav('/');
  };
  return (
    <Container className="mt-4">
      <h2>Employees</h2>
      <Button className="mb-3" onClick={() => nav('/addEmployee')}>Add Employee</Button>
      {loading ? <Spinner animation="border"/> :
      <Table bordered hover>
        <thead><tr><th>Name</th><th>Email</th><th>Designation</th><th>Salary</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td><td>{e.email}</td><td>{e.designation}</td><td>{e.salary}</td>
              <td>
                <Button size="sm" onClick={() => nav(`/edit/${e._id}`)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => dispatch(deleteEmp(e._id))}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>}
      <button onClick={handleLogout}>Logout</button>
    </Container>
  )
}

export default Dashboard
