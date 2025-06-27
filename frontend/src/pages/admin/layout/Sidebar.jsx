import React from 'react'
import { NavLink } from 'react-router';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Category', path: '/admin/categories' },
        { name: 'Users', path: '/admin/users' }
    ];
    return (
        <div className="w-60 h-screen bg-gray-800 text-white flex flex-col p-4">
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                        `py-2 px-4 rounded hover:bg-gray-700 mb-2 ${isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar