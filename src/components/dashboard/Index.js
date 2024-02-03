import React from 'react'
import NavBar from '../NavBar/NavBar'
import HomePage from '../Home/Home'
import { Link, useNavigate } from 'react-router-dom'

const Index = () => {
  const token = localStorage.getItem("authToken")
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" ,justifyContent: "center"}}>
      {token ? <div style={{ marginTop: "5rem" }}>
        <h5>Welcome To HyperVerge</h5>
      </div>: <div style={{ marginTop: "5rem" }}><Link to="/">"Back to Home"</Link></div>}

    </div>
  )
}

export default Index

