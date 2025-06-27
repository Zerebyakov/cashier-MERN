import { Fragment } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login')
    }
    return (
        <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
            <h1 className="text-2xl font-bold text-gray-700">Kasir</h1>
            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 text-gray-700">
                    <span>{user?.name}</span>
                    <ChevronDownIcon className="w-5 h-5" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition duration-100"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''
                                        }`}
                                >
                                    Profile
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    className={`w-full text-left px-4 py-2 text-sm text-red-600 ${active ? 'bg-gray-100' : ''
                                        }`}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Navbar