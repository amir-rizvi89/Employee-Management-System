import React, {useState} from 'react'
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'
import { login } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState(''), [pwd, setPwd] = useState('')
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(s => s.auth)
  const nav = useNavigate()

  const sub = async (e:any) => {
    e.preventDefault()
    const res = await dispatch(login({ email, password: pwd }))
    if (login.fulfilled.match(res)) nav('/')
  }

  return (
    <Container className="mt-5" style={{maxWidth: 400}}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={sub}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={pwd} onChange={e => setPwd(e.target.value)} />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm"/> : 'Login'}
        </Button>
      </Form>
    </Container>
  )
}

export default Login
