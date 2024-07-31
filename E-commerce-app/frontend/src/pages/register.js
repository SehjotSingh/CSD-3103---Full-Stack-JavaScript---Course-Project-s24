import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DarkModeToggle from '../components/DarkModeToggle';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', {
                firstName,
                lastName,
                email,
                password,
            });

            if (res.data) {
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error.response?.data?.errors?.map(err => err.msg).join(', ') ||
                error.response?.data?.msg ||
                'Registration failed. Please try again.'
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800 px-4 py-6 text-center sm:px-16">
                <DarkModeToggle />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Register</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Register
                    </button>
                    {errorMessage && <div className="text-red-500 dark:text-red-400 mt-2">{errorMessage}</div>}
                </form>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    {"Already have an account? "}
                    <Link href="/login" legacyBehavior>
                        <a className="font-semibold text-gray-800 dark:text-gray-300">Sign in</a>
                    </Link>
                    {" now."}
                </p>
            </div>
        </div>
    );
};

export default Register;
