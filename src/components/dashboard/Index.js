// Index.js

import React from 'react';
import './index.css';
import SideBar from './SideBar';

const Index = () => {
  const user = localStorage.getItem("user");
  const isAdmin = JSON.parse(user)?.userDetials.Role
  return (
    <>
      <div className="container">
        <div className="banner-container">
          <div className="overlay-text">
            <h5>Welcome To HyperVerge</h5>
          </div>
        </div>
      </div>
    </>

  );
}

export default Index;
