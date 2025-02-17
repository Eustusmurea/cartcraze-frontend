import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    fetchUser();

    // Listen for storage changes (if logged in from another tab)
    const handleStorageChange = () => fetchUser();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    window.location.reload(); // Ensures state updates across the app
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MyStore
      </Link>
      <div className="flex space-x-4">
        <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
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
