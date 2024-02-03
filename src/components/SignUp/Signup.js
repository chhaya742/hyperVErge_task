import logo from '../../assests/logo1.png';
import './Signup.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupValidChecker } from '../../assests/styles/signupValidation';
import { useAuth } from '../Context/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const Signup = () => {

    const navigate = useNavigate();
    const { signupPage, checkRegistrationLink, storelinkData } = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({ isError: true })
    const [file, setFile] = useState()
    const [link, setLink] = useState({ Link: "" })
    const [isLink, setIsLink] = useState(false)
    const [userDetail, setUserDetail] = useState({ Name: "", Address: "", Email: "", Password: "", Phone: "", inviteLink: "" });

    useEffect(() => {
        if (!error.isError) {
            signupPage(userDetail);
        }
    }, [error]);

    const inputHandler = (e) => {
        const { name, value } = e
        setUserDetail({ ...userDetail, [name]: value })
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0].name)
        userDetail.Profile_pic = e.target.files[0].name
        // console.log(e.target.files[0]);
    }
    const clickHandler = async () => {
        const error = signupValidChecker(userDetail);
        setError(error)
    };
    const handleLink = (e) => {
        const { name, value } = e.target
        setLink({ ...link, [name]: value })
    }
    // console.log(file);

    const checkLink = (e) => {
        e.preventDefault()
        checkRegistrationLink(link)
        if (link.Link) {
            setIsLink(false)
        } else {
            setIsLink(true)
        }


    }
    console.log(storelinkData);
    return (
        <div style={{ display: "flex", justifyContent: "center", marginLeft: "249px" }}>
            <div className="registration">
                <img src={logo} className="logo" alt="iNoteBook" />
                <div >
                    <label htmlFor='Name'>Enter a Invite Link
                        <div >
                            <input style={{marginBottom:"0.5rem"}} type="text" placeholder="Invite Link" name="Link" value={link.Link} onChange={(e) => handleLink(e)} />

                            {storelinkData ? <FaCheck /> :
                                <button style={{ margin: "3px", borderRadius: "4px" }} onClick={(e) => checkLink(e)}>Check</button>
                            }
                        </div>
                    </label>
                    {isLink && <div style={{ color: "red" }}>Insert a Valid Link</div>}
                </div>
               
                {storelinkData && <div className='form'>
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
                                <input className='form-control select-input placeholder-active active' type="text" name="Address" placeholder="Enter Address" value={userDetail.Address} onChange={(e) => inputHandler(e.target)} />
                                {error.Address && <div style={{ color: "red" }}>{error.Address}</div>}
                            </label>

                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor='Password'>Password (8 characters min)
                                <input className='form-control select-input placeholder-active active' type={showPassword ? "text" : "password"} minLength="8" name="Password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={userDetail.Password} onChange={(e) => inputHandler(e.target)} />
                                <input id="check" type="checkbox" value={showPassword} onChange={() => setShowPassword((prev) => !prev)} /> <label>show password</label>
                                {error.Password && <div style={{ color: "red" }}>{error.Password}</div>}
                            </label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor='Phone'>Phone
                                <input className='form-control select-input placeholder-active active' type="Phone" name="Phone" placeholder="Entr Phone" value={userDetail.Phone} onChange={(e) => inputHandler(e.target)} />
                                {error.Phone && <div style={{ color: "red" }}>{error.Phone}</div>}
                            </label>
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor='Profile_pic'>Profile_pic
                                <input className='form-control select-input placeholder-active active' type="file" name="Profile_pic" placeholder="upload profile pic" onChange={handleFileChange} />
                                {/* {error.Profile_pic && <div style={{ color: "red" }}>{error.Profile_pic}</div>} */}
                            </label>
                        </div>
                    </div>
                    <div style={{ position: "absolute" }}>
                        <button className='btn btn-success btn-lg mb-1' onClick={clickHandler}>Signup</button>
                    </div>
                    <div >
                        <Link style={{ float: "right", paddingRight: "30px" }} to="/login" >Login</Link>
                    </div>
                </div>}

            </div>
        </div>
    )
};

export default Signup;




