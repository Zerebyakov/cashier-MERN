import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import CashierLayout from './layout/CashierLayout';
import Cashier from './components/Cashier';

const CashierDashboard = () => {
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <CashierLayout>
            <div className='border border-black p-10'>
                <div role="status" class="space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div class="w-full">
                        <h1 className="text-5xl font-bold mb-6">Kasir Kita</h1>
                        <p className='text-xl mb-10'>Welcome, {user?.name}</p>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
                <div>

                    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-black text-white px-6 py-2 rounded-full transition-all"
                    >
                        TRANSAKSI
                    </button>
                </div>
                <Cashier isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
            </div>
            <div>

            </div>


        </CashierLayout>
    );
};

export default CashierDashboard;
