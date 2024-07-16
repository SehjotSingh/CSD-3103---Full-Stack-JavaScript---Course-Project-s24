import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup';
import { useRouter } from 'next/router';

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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {popup.show && <Popup message={popup.message} type={popup.type} />}
            </form>
        </div>
    );
};

export default RegistrationForm;
