import { useState } from 'react';
import { api } from '../api'; 
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/account/login/", { email, password });
            localStorage.setItem("token", res.data.access); 
            navigate("/"); 
        } catch (err: any) {
            setError("Invalid credentials. Please try again."); 
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
          <h1 className="text-xl font-bold">Login</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mt-4" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mt-4" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Login</button>
        </form>
      );
    };

export default Login;
