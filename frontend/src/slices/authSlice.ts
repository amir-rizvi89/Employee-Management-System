// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/axios'

interface AuthState {
  token: string | null
  loading: boolean
  error?: string
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (cred: { email: string; password: string }) => {
    const res = await api.post('/api/login', cred)
    return res.data.token
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', action.payload)
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.error = 'Login failed'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
