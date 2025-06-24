import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/addEmployee" element={
          <PrivateRoute><AddEmployee /></PrivateRoute>
        } />

        <Route path="/edit/:id" element={
          <PrivateRoute><EditEmployee /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
