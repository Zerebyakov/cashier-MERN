import AdminLayout from "./layout/AdminLayout";
import SplitText from "./animation/SplitText";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const {user} = useAuth();
  
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <SplitText
        text={`Hello, ${user?.name}`}
        className="text-2xl font-bold mb-4 flex justify-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;