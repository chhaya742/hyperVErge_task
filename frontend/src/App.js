import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/Signup';
import Index from './components/dashboard/Index';
import User from './components/User/Listing';
import Admin from '../src/components/Admin/index';
import ProfilePage from '../src/components/UserProfile/ProfilePage';
import "./App.css";
import Header from './components/dashboard/Header';
import { useAuth } from '../src/components/Context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const { isAuthenticated, isToken } = useAuth();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    isAuthenticated()
    if (isToken?.status && authToken) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  }, [isToken?.status]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/user-profile/:id' element={<ProfilePage />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/admin" element={<Admin />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} pauseOnHover={false} />
    </>
  );
}

export default App;
