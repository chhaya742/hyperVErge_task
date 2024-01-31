import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../assests/logo1.png';
import { loginValidation } from '../../assests/styles/signupValidation';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Login = () => {
    const navigate = useNavigate();
    const { loginPage, login } = useAuth();
    const [error, setError] = useState({ isError: true })
    const [loginDetail, setLoginDetail] = useState({ Email: "", Password: "", });

    useEffect(() => {
        if (!error.isError) {
            loginPage(loginDetail);
        }
    }, [error]);

    const inputHandler = (e) => {
        const { name, value } = e;
        setLoginDetail({ ...loginDetail, [name]: value })
    }

    const clickHandler = async () => {

        const error = loginValidation(loginDetail);
        setError(error)
    };
    const user = localStorage.getItem("authToken")
    return (
        <>
            {user && <NavBar />}
            <div className="iApp">
                <img src={logo} className="logo" alt="iNoteBook" />
                <div className='form'>
                    <div className='input-group'>
                        <label htmlFor='Email'>Email </label>
                        <input type="Email" name="Email" placeholder="nome@email.com.br" onChange={(e) => inputHandler(e.target)} />
                        {error.Email && <div style={{ color: "red" }}>{error.Email}</div>}
                    </div>
                    <div className='input-group'>
                        <label htmlFor='Password'>Password </label>
                        <input type="Password" name="Password" placeholder="Chhaya@123" onChange={(e) => inputHandler(e.target)} />
                        {error.Password && <div style={{ color: "red" }}>{error.Password}</div>}
                    </div>
                    <div style={{ position: "absolute" }}>
                        <div>
                            <button className='primary' onClick={clickHandler}>LogIn</button>
                        </div>
                    </div>
                    <div style={{ paddingRight: "3px" }}>
                        <Link className='secondry' style={{ float: "right" }} to="/signup" >Signup</Link>
                    </div>
                </div>
            </div>;
        </>
    )

};
export default Login;