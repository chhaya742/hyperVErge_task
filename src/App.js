// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/Signup';
import HomePage from '../src/components/Home/Home';
import Index from './components/dashboard/Index';
import User from '../src/components/User/index'
import Admin from '../src/components/Admin/index'
import ProfilePage from '../src/components/UserProfile/ProfilePage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/dashboard/user' element={<User />} />
        <Route path='/dashboard/admin' element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false}
      />
    </>
  )
}

export default App;