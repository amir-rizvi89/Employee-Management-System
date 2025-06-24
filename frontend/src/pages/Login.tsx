import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      dispatch(loginSuccess(res.data.token)); // store token in Redux
      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login</h2>
      <input
        className="form-control mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
