import { useNavigate } from 'react-router-dom';

function Home({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Home</h2>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <div>
          <button 
            className="w-full p-2 bg-blue-500 text-white mb-2"
            onClick={ () => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="w-full p-2 bg-gray-500 text-white mb-2"
            onClick={ () => navigate('/register')}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;