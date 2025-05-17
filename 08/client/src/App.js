import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AuthCallback from './components/AuthCallback';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUser(res.data));
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;