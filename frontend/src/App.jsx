import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import Login from "./pages/Login";
import CashierDashboard from "./pages/cashier/CashierDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/product/Products";
import Category from "./pages/admin/category/Category";
import Users from "./pages/admin/users/Users";
import { useAuth } from './context/AuthContext';
import EditProduct from './pages/admin/product/EditProduct';
import EditUser from './pages/admin/users/EditUser';



function App() {
  const { user, loading } = useAuth();

  const AdminRoute = ({ children }) => {
    if (loading) return <div className="p-6">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ROUTE ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Category />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App
