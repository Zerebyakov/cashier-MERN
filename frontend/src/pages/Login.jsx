import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth(); // gunakan setUser langsung, bukan getMe
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Kirim login
            const res = await axios.post('http://localhost:5000/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            // 2. Simpan user langsung ke context
            setUser(res.data);

            // 3. Redirect langsung
            const role = res.data.role;
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'cashier') {
                navigate('/cashier/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;