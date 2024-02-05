// Header.js

import "./index.css"
import { Link } from "react-router-dom";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { AiOutlineBars } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import mono from '../../assests/imagelogo.png';
import SideBar from "./SideBar";
const Header = () => {

  const navigate = useNavigate();
  var handleRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    toast.success("logout Successfully");
    navigate("/login");
  }

  const user = localStorage.getItem("user");
  const isAdmin = JSON.parse(user)?.userDetials.Role
  return (
    <header className="header" style={{ background: user ? "" : "black" }}>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          {!user && <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">SignUp</a></li>
          </>}
        </ul>

      </nav>
      {user && <div className="dropdown">
        <span><AiOutlineBars style={{ width: "30px", height: "30px" }} /></span>
        <div>
          <div className="dropdown-content">
            <div>
              <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate(`/user-profile/${JSON.parse(user)?.userDetials?.id}`)}>
                <img className="profile-pic" alt="Profile_pic" src={mono} />Signed in as {JSON.parse(user)?.userDetials?.Name}</p>
            </div>
            <p><IoPersonAdd style={{ color: "black" }} /> <Link className="dropdown-option" to="/login" >  Add another account</Link></p>
            <p><IoIosHelpCircle /> <Link className="dropdown-option" to="/help"> Help</Link></p>
            <p> <IoMdSettings /> <Link className="dropdown-option" to="/setting"> Setting</Link></p>
            <hr />
            <p style={{ cursor: "pointer" }} onClick={handleRedirect}>Logout</p>
          </div>
        </div>
      </div>}
      {Number(isAdmin) === 2 && <SideBar user={user} />}
    </header>
  );
}

export default Header;
