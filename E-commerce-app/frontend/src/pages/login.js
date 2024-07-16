import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });
            console.log("Response:", res);

            if (res.data) {
                console.log("Login successful, redirecting...");
                await router.push('/dashboard');
                console.log("Redirected to dashboard");
            } else {
                console.log("Login failed, no data returned.");
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage(error.response?.data?.msg || 'Login failed. Please try again.');
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
                {errorMessage && <div>{errorMessage}</div>}
                <a href="/register">Don't have an account? Register here</a>
            </form>
        </div>
    );
};

export default LoginForm;
