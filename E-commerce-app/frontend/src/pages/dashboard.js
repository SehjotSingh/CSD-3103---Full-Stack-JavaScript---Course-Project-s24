import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Dashboard;
