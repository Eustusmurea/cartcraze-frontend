import { useState } from 'react';
import { api } from '../api'; // Assuming you have an API utility
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email,
            username,
            password,
            password2: password,
        };

        try {
            const res = await api.post("/account/register/", userData);
            localStorage.setItem("token", res.data.token.access); // Storing JWT token
            navigate("/"); // Redirect to homepage or another route
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Registration failed. Please try again.');
        }

    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Register</h1>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <form onSubmit={handleRegister} className="mt-4">
            <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border mt-4"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border mt-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border mt-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border mt-4"
                    required
                />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
