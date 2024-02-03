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
import SideBar from "./SideBar";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => {
    setDropdown(!dropdown);
  }

  const navigate = useNavigate();
  var handleRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    toast.success("logout Successfully");
    navigate("/login");
  }
  const user = localStorage.getItem("user");
  return (
    <div style={{ backgroundColor: 'black', color: 'white,', width: '100%', position: "fixed", zIndex: "1" }}>
      <div style={{ display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between' }}>
        <div style={{ position: "relative", top: "0.5rem" }} >
          <p><Link to="/"><img src={mono} className="mono" alt="hyper_verge" /></Link></p>
        </div>
        <div style={{ position: "relative" }} >
          <p style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")} >text</p>
        </div>
        <div className="dropdown">
          <span><AiOutlineBars style={{ width: "30px", height: "30px" }} /></span>
          <div>
            <div className="dropdown-content">
              <div>
                <p style={{ cursor: "pointer", textDecoration: "underline"}} onClick={() => navigate(`/user-profile/${JSON.parse(user)?.userDetials?.id}`)}>
                  <img className="profile-pic" src={mono}/>Signed in as <a>{JSON.parse(user)?.userDetials?.Name}</a></p>
              </div>
              <p><IoPersonAdd style={{ color: "black" }} /> <Link className="dropdown-option" to="/login" >  Add another account</Link></p>
              <p><IoIosHelpCircle /> <Link className="dropdown-option" to="/help"> Help</Link></p>
              <p> <IoMdSettings /> <Link className="dropdown-option" to="/setting"> Setting</Link></p>
              <hr />
              <p style={{ cursor: "pointer" }} onClick={handleRedirect}>Logout</p>
            </div>
          </div>
        </div>
      </div>
      <SideBar user={user} />
    </div>
  );
}

export default NavBar;
