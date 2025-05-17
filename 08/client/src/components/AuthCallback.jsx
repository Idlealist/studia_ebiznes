import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function AuthCallback({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data);
        navigate('/');
      }).catch(err => {
        console.error(err);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [location, navigate, setUser]);

  return <div>Loading...</div>;
}

export default AuthCallback;