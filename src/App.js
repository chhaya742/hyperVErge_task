import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/Signup';
import HomePage from '../src/components/Home/Home';
import Index from './components/dashboard/Index';
import User from './components/User/Listing';
import Admin from '../src/components/Admin/index';
import ProfilePage from '../src/components/UserProfile/ProfilePage';
import "./App.css";
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/Context/PrivateRoute';

function App() {
  const authToken = localStorage.getItem("authToken");

  return (
    <>
      {authToken && <NavBar />}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/user-profile/:id' element={<ProfilePage />} />
          <PrivateRoute path="/dashboard" element={<Index />} />
          <PrivateRoute path="/dashboard/user" element={<User />} />
          <PrivateRoute path="/dashboard/admin" element={<Admin />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} pauseOnHover={false} />
    </>
  );
}

export default App;
