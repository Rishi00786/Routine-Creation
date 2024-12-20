import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const api_url = import.meta.env.VITE_API_URL
            // const api_url = 'http://localhost:3000'
            const response = await fetch(`${api_url}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            // console.log(data);
            const access_token = data.access_token
            localStorage.setItem('access_token', access_token);
            if (response.ok) {
                alert(data.message);
                navigate('/routines');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            alert('An error occurred', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
                >
                    Log In
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="w-full text-green-600 py-2 rounded-lg hover:underline"
                >
                    New user? Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;