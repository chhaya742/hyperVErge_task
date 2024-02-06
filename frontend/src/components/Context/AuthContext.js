import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [updateuser, setUpdateUser] = useState();
    const [data, setData] = useState();
    const [adminData, setAdminData] = useState();
    const [adminTotal, setAdminTotal] = useState(null)
    const [total, setTotal] = useState(null)
    const [storelinkData, setStorelinkData] = useState()
    const [isToken, setIsToken] = useState();
    const authToken = localStorage.getItem("authToken")
    const [isLink, setIsLink] = useState(false)

    const loginPage = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/login", data);
            if (response.data.status) {
                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("/dashboard");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signupPage = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/create", data);
            // console.log(response);
            if (response.data.status) {
                toast.success(response.data.message)
                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("/dashboard")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkRegistrationLink = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/check-link", data, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                setIsLink(true)
                setStorelinkData(response.data)
                toast.success(response.data.message)
            } else {
                setIsLink(false)
                setStorelinkData(response.data)
                // toast.error(response.data.message)
                toast.error("Invalid invite link. Please contact your Admin.")
            }
        } catch (error) {
            setIsLink(false)
            toast.error("Invalid invite link. Please contact your Admin.")

            console.log(error);
        }
    }
    const addRegistrationLink = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/add-link", data, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status) {
                // setStorelinkData(response.data)
                // toast.success(response.data.message)
            } else {
                // setStorelinkData(response.data)
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Invalid invite link")

            console.log(error);
        }
    }
    const updateUserPage = async (userData) => {

        let formData = new FormData();
        formData.append('Profile_pic', userData.Profile_pic);
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/update", formData, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status) {
                setUpdateUser(response.data.data)
                toast.success(response.data.message)
                navigate("/dashboard")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserByID = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/id", { id: data },
                {
                    headers: {
                        Authorization: `bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                })

            if (response.data.status) {
                setUserData(response.data.data[0])
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (data) => {
        console.log(data);
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/delete", { id: data }, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.status) {
                toast.success(response.data.message) 
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const userListPage = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/user/list", data, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status) {
                setData(response.data.data.users)
                setTotal(response.data.data.total)
                // toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const adminListPage = async (data) => {
        try {
            const response = await axios.post("https://hyper-verge-api.vercel.app/admin/list", data, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status) {
                setAdminData(response.data.data.users)
                setAdminTotal(response.data.data.total)
                // toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };


    const isAuthenticated = async () => {
        if (authToken) {
            if (isTokenExpired(authToken)) {
                setIsToken({ status: true, message: "Token is expired" })
            } else {
                setIsToken({ status: false, message: "Token is valid" })
            }
        } else {
            setIsToken({ status: true, message: "Token not found" })
        }
    }

    return (
        <AuthContext.Provider value={{ isLink, addRegistrationLink, isToken, isAuthenticated, authToken, storelinkData, checkRegistrationLink, deleteUser, adminListPage, setUserData, adminTotal, adminData, total, loginPage, signupPage, getUserByID, updateUserPage, userData, userListPage, data }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }