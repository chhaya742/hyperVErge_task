import React from 'react'
import './home.css';
import Dashboard from '../dashboard/Index';
import LoginForm from '../Login/Login';
import NavBar from '../NavBar/NavBar'


 const HomePage=()=> {
    const user=localStorage.getItem("authToken")
    // console.log(user);
    return(
        <div>
        {user ? <Dashboard/>:<LoginForm/>}
        </div>
    )
}
export default HomePage;