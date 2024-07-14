import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });
            // Assuming successful login redirects to dashboard or another route
            if (res.data) {
                // Handle successful login (e.g., redirect to dashboard)
            }
        } catch (error) {
            setErrorMessage(error.response.data.msg || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
            <a href="/register">Don't have an account? Register here</a>
        </div>
    );
};

export default LoginForm;
