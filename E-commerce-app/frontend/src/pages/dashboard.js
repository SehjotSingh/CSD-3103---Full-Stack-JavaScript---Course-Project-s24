import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/auth', {
                    withCredentials: true,
                });
                console.log('Auth Response:', res.data); // Debugging log
                setUser(res.data.user);
            } catch (error) {
                console.error('Auth Error:', error); // Debugging log
                setError('Unauthorized access. Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
            router.push('/login');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="text-red-500">{error}</div>
        </div>;
    }

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="text-gray-700 dark:text-gray-300">Loading...</div>
        </div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome to the Dashboard</h1>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">Hello, {user.firstName} {user.lastName}</p>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 mt-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
