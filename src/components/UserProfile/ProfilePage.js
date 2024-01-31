// import { useState } from 'react';
// // import '../assests/css/login.css';
import logo from '../../assests/logo1.png';
import '../SignUp/Signup.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { signupValidChecker } from '../../assests/styles/signupValidation';
import { useAuth } from '../../components/Context/AuthContext';
import { toast } from "react-toastify";
import NavBar from '../NavBar/NavBar';
const ProfilePage = () => {
    // console.log("**********");
    const navigate = useNavigate();
    const { userListPage, userData, updateUserPage } = useAuth();

    const [error, setError] = useState({ isError: true })
    const [userDetail, setUserDetail] = useState({ Name: "", Address: "", Email: "", Password: "", Phone: "", Profile_pic: "" });

    var { id } = useParams();
    const data={
        "id":id
    }
    useEffect(() => {
        if (!error.isError) {
            updateUserPage(userDetail);
        }
    }, [error]);

    useEffect(() => {
        userListPage(data)
    }, [1])

    const inputHandler = (e) => {
        const { name, value } = e
        setUserDetail({ ...userDetail, [name]: value })
    }

    const clickHandler = async () => {
        const error = signupValidChecker(userDetail);
        setError(error)
    };

    var handleRedirect = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
        toast.success("logout Successfully")
        navigate("/login")
    }
    return (
        <>
        <NavBar/>
            <div className="registration">
            <img src={logo} className="logo" alt="iNoteBook" />
            <div className='form'>
                <div className='row'>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Name'>Name
                            <input className='form-control select-input placeholder-active active' type="Name" name="Name" placeholder="Name" value={userDetail.Name} onChange={(e) => inputHandler(e.target)} />
                            {error.Name && <div style={{ color: "red" }}>{error.Name}</div>}
                        </label>

                    </div>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Email'>Email
                            <input className='form-control select-input placeholder-active active' type="Email" name="Email" placeholder="nome@email.com.br" value={userDetail.Email} onChange={(e) => inputHandler(e.target)} />
                            {error.Email && <div style={{ color: "red" }}>{error.Email}</div>}
                        </label>

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Address'>Address
                            <input className='form-control select-input placeholder-active active' type="Address" name="Address" placeholder="Address" value={userDetail.Address} onChange={(e) => inputHandler(e.target)} />
                            {error.Address && <div style={{ color: "red" }}>{error.Address}</div>}
                        </label>

                    </div>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Password'>Password
                            <input className='form-control select-input placeholder-active active' type="Password" name="Password" placeholder="Chhaya@123" value={userDetail.Password} onChange={(e) => inputHandler(e.target)} />
                            {error.Password && <div style={{ color: "red" }}>{error.Password}</div>}
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Phone'>Phone
                            <input className='form-control select-input placeholder-active active' type="Phone" name="Phone" placeholder="" value={userDetail.Phone} onChange={(e) => inputHandler(e.target)} />
                            {error.Phone && <div style={{ color: "red" }}>{error.Phone}</div>}
                        </label>
                    </div>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Profile'>Profile
                            <input className='form-control select-input placeholder-active active' type="Profile" name="Profile" placeholder="" value={userDetail.Profile} onChange={(e) => inputHandler(e.target)} />
                            {error.Profile && <div style={{ color: "red" }}>{error.Profile}</div>}
                        </label>
                    </div>

                </div>

                <div style={{ position: "absolute" }}>
                    <button className='btn btn-success btn-lg mb-1' onClick={clickHandler}>Save</button>
                </div>
                <div >
                    <Link style={{ float: "right", paddingRight: "30px" }} onClick={handleRedirect} to="/login" >Logout</Link>
                </div>
            </div>
        </div>
        </>
        
    )
};

export default ProfilePage;




