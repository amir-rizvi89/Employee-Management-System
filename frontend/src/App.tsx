import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmpForm from './pages/EmpForm'
import EditEmployeePage from './pages/EditEmployeePage'
import { useSelector } from 'react-redux'
import type { RootState } from './store'


function App() {
  const token = useSelector((s:RootState) => s.auth.token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login/> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Dashboard/> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <EmpForm/> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={token ? <EditEmployeePage/> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
