// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DarkModeToggle from '../components/DarkModeToggle';

const Login = () => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800 px-4 py-6 text-center sm:px-16">
                <DarkModeToggle />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sign In</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use your email and password to sign in</p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Sign In
                    </button>
                    {errorMessage && <div className="text-red-500 dark:text-red-400 mt-2">{errorMessage}</div>}
                </form>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    {"Don't have an account? "}
                    <Link href="/register" legacyBehavior>
                        <a className="font-semibold text-gray-800 dark:text-gray-300">Sign up</a>
                    </Link>
                    {" for free."}
                </p>
            </div>
        </div>
    );
};

export default Login;
