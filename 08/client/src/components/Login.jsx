import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const userRes = await axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      setUser(userRes.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(`Login failed: ${err.response.data.message}`);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-2 border"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full p-2 bg-red-500 text-white mb-2"
      >
        Login with Google
      </button>
      <button
        onClick={handleGitHubLogin}
        className="w-full p-2 bg-gray-800 text-white"
      >
        Login with GitHub
      </button>
    </div>
  );
}

export default Login;