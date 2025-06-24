import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createEmp, updateEmp, fetchEmps } from '../slices/employeeSlice'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'

type FormState = { name:string; email:string; designation:string; salary:string }

const EmpForm = () => {
  const { id } = useParams<{id:string}>()
  const [s, setS] = useState<FormState>({name:'',email:'',designation:'',salary:''})
  const [loadingLocal, setLoadingLocal] = useState(false)
  const [errMsg, setErr] = useState('')
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  useEffect(() => {
    if (id) {
      setLoadingLocal(true)
      axios.get(`/api/employees/${id}`).then(res => {
        const e = res.data; setS({name:e.name,email:e.email,designation:e.designation,salary:e.salary})
      }).catch(() => setErr('Load fail')).finally(() => setLoadingLocal(false))
    }
  }, [id])

  const sub = async (e: any) => {
    e.preventDefault()
    if (!s.name || !s.email || !s.designation || !+s.salary) { setErr('All fields valid'); return }
    setErr('')
    if (id) await dispatch(updateEmp({ _id:id, ...s, salary:+s.salary }))
    else await dispatch(createEmp({ ...s, salary:+s.salary }))
    dispatch(fetchEmps())
    nav('/')
  }

  return (
    <Container className="mt-4" style={{maxWidth:500}}>
      <h2>{id ? 'Edit' : 'Add'} Employee</h2>
      {errMsg && <Alert variant="danger">{errMsg}</Alert>}
      {loadingLocal ? <Spinner animation="border"/> :
      <Form onSubmit={sub}>
        {['name','email','designation','salary'].map(f=>(
          <Form.Group className="mb-3" key={f}>
            <Form.Label>{f.charAt(0).toUpperCase()+f.slice(1)}</Form.Label>
            <Form.Control
              type={f === 'salary' ? 'number' : 'text'}
              value={(s as any)[f]}
              onChange={e => setS(cs => ({...cs, [f]: e.target.value}))}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit">{id ? 'Update':'Create'}</Button>
      </Form>}
    </Container>
  )
}

export default EmpForm
