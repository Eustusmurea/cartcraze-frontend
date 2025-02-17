import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">MyStore</Link>
      <div className="flex space-x-4">
        <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
