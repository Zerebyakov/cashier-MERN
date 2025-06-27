import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const CashierDashboard = () => {
    const { user,logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Cashier Dashboard</h1>
            <p>Welcome, {user?.name}</p>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    );
};

export default CashierDashboard;
