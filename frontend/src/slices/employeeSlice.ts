// src/slices/employeeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/axios'
import type { RootState } from '../store'

export interface Employee {
  _id: string
  name: string
  email: string
  designation: string
  salary: number
}

interface EmployeeState {
  list: Employee[]
  loading: boolean
  error?: string
}

const initialState: EmployeeState = {
  list: [],
  loading: false,
}

export const fetchEmps = createAsyncThunk('emp/fetch', async (_, { getState }) => {
  const token = (getState() as RootState).auth.token
  const res = await api.get('/api/employees', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
})

export const createEmp = createAsyncThunk('emp/create', async (emp: Omit<Employee, '_id'>, { getState, dispatch }) => {
    
  const token = (getState() as RootState).auth.token
  await api.post('/api/employees', emp, {
    headers: { Authorization: `Bearer ${token}` },
  })
  dispatch(fetchEmps())
})

export const fetchEmployeeById = createAsyncThunk(
  'emp/fetchById',
  async (id: string, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token
    try {
      const response = await api.get(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed')
    }
  }
)
export const updateEmp = createAsyncThunk('emp/update', async (emp: Employee, { getState, dispatch }) => {
  const token = (getState() as RootState).auth.token
  console.log('=========================')
  await api.put(`/api/employees/${emp._id}`, emp, {
    headers: { Authorization: `Bearer ${token}` },
  })
  dispatch(fetchEmps())
})

export const deleteEmp = createAsyncThunk('emp/delete', async (id: string, { getState, dispatch }) => {
  const token = (getState() as RootState).auth.token
  await api.delete(`/api/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  dispatch(fetchEmps())
})

const empSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmps.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchEmps.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchEmps.rejected, (state) => {
        state.loading = false
        state.error = 'Fetch failed'
      })
  },
})

export default empSlice.reducer
