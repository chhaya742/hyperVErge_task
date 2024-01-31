import { Link } from "react-router-dom";
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './navBar.css'
import { toast } from "react-toastify";

import { AiOutlineBars } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";

import mono from '../../assests/imagelogo.png';

const NavBar = (props) => {
  const [dropdown, setDropdown] = useState(false)
  const showDropdown = () => {
    setDropdown(!dropdown)
  }

  const navigate = useNavigate();
  var handleRedirect = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    toast.success("logout Successfully")
    navigate("/login")
  }
  const user = localStorage.getItem("user")
  return (
    <div style={{ backgroundColor: 'black', color: 'white,', position: 'fixed', top: '0', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between' }}>
        <div>
          <p><img src={mono} className="mono" alt="hyper_verge" /></p>
        </div>
        <div style={{ position: "relative", right: "214px", top: "5px" }} >
          <p >test</p>
        </div>
        <div className="dropdown">
          <span><AiOutlineBars style={{ width: "25px", height: "44px" }} /></span>
          <div className="dropdown-content">
            <p> Signed in as <Link className="dropdown-option" to={`/profile/${JSON.parse(user).userDetials.id}`} >{JSON.parse(user).userDetials.Name}</Link></p>
            <p><IoPersonAdd style={{ color: "black" }} /> <Link className="dropdown-option" to="/login" >   Add another account</Link></p>
            <p><IoIosHelpCircle /> <Link className="dropdown-option" to="/help" > Help</Link></p>
            <p> <IoMdSettings /> <Link className="dropdown-option" to="/help" > Setting</Link></p>
            <hr />
            <p style={{ cursor: "pointer" }} onClick={handleRedirect}>Logout</p>
          </div>
        </div>
      </div>
      <div>
        {/* <SideBar /> */}
      </div>
    </div>
  );
}
export default NavBar;