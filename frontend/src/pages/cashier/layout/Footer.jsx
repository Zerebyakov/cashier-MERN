import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const Footer = () => {
    const { logout } = useAuth();


    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <div>
            <footer class="rounded-lg shadow-sm m-4 bg-[f9f0e7]">
                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a onClick={handleLogout} class="hover:underline me-4 md:me-6 cursor-pointer">Logout</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

        </div>
    )
}

export default Footer