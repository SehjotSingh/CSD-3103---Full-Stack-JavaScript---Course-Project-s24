import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup';
import { useRouter } from 'next/router';
import DarkModeToggle from '../components/DarkModeToggle';

const RegistrationForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [popup, setPopup] = useState({ show: false, message: '', type: '' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', {
                fullName,
                email,
                password,
                address,
            });

            if (res.data) {
                setPopup({ show: true, message: 'Registration successful', type: 'success' });
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            setPopup({
                show: true,
                message: error.response?.data?.msg || 'Registration failed. Please try again.',
                type: 'error',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <div className="flex justify-center mb-4">
                    <DarkModeToggle />
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name:</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Register
                    </button>
                    {popup.show && <Popup message={popup.message} type={popup.type} />}
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
