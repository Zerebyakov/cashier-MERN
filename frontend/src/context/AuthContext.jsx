import { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import myApi from '../pages/api/Api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // tambahkan loading

    const getMe = async () => {
        try {
            const res = await axios.get(myApi+ '/me', {
                withCredentials: true
            });
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false); // selesai loading apapun hasilnya
        }
    };
    const logout = async () => {
        try {
            await axios.delete( myApi+ '/logout', { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, getMe, loading,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);