// src/components/Auth.js
import React, { useState } from 'react';
import './Auth.css'; // Import CSS file for styling

const Auth = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            // Simulate registration
            localStorage.setItem('user', JSON.stringify({ username, password }));
            alert('Registration successful!');
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username === username && user.password === password) {
                onLogin(user);
            } else {
                alert('Invalid credentials');
            }
        }
        setUsername('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
