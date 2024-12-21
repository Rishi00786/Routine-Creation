// Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // const api_url = import.meta.env.VITE_API_URL
            const api_url = 'http://localhost:3000'
            const response = await fetch(`${api_url}/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log(data);

            localStorage.setItem('access_token', data.access_token);
            if(data.message === 'Error creating user'){
                alert('Username already exists');
                return;
            }
            if (response.ok) {
                alert('Signup successful!');
                navigate('/routines');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            alert('An error occurred', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSignup}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => navigate('/user/login')}
                    className="w-full text-blue-600 py-2 rounded-lg hover:underline"
                >
                    Already a user? Log In
                </button>
            </div>
        </div>
    );
};

export default Signup;