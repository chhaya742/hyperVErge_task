import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState([]);
    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [QueryString, setQueryString] = useState("");
    const [updateuser, setUpdateUser] = useState();
    const [data, setData] = useState();
    const [adminData, setAdminData] = useState();
    const [adminTotal, setAdminTotal] = useState(null)
    const [total, setTotal] = useState(null)
    const [storelinkData, setStorelinkData] = useState()
    const loginPage = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user/login", data);
            if (response.data.status) {

                setLogin(response.data.data)

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
            // console.log(data);
            const response = await axios.post("http://localhost:4000/user/create", data);
            if (response.data.status) {
                setUser(response.data)
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
            console.log(data);
            const response = await axios.post("http://localhost:4000/check-link", data);
            // console.log(response);
            if (response.data.status) {
                setStorelinkData(response.data)
                toast.success(response.data.message)
            } else {
                // toast.error(response.data.message)
                toast.error("Invalid invite link. Please contact your Admin.")
            }
        } catch (error) {
            toast.error("Invalid invite link. Please contact your Admin.")

            console.log(error);
        }
    }
    const updateUserPage = async (userData) => {
        try {
            const response = await axios.post("http://localhost:4000/user/update", userData);
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
            const response = await axios.post("http://localhost:4000/user/id", { id: data });
            // console.log(response.data);

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
        // console.log(data);
        try {
            const response = await axios.delete("http://localhost:4000/user/delete", { id: data });

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
            const response = await axios.post("http://localhost:4000/user/list", data);
            if (response.data.status) {
                
                setData(response.data.data.users)
                setTotal(response.data.data.total)
                toast.success(response.data.message)
            } else {
                console.log(response.data);
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }

    }

    const adminListPage = async (data) => {
        try {
            const response = await axios.get("http://localhost:4000/admin/list", data);
            if (response.data.status) {
                setAdminData(response.data.data.users)
                setAdminTotal(response.data.data.total)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const authToekn=localStorage.getItem("authToken")
    return (
        <AuthContext.Provider value={{ authToekn,storelinkData, checkRegistrationLink, deleteUser, adminListPage, setUserData, adminTotal, adminData, total, loginPage, signupPage, getUserByID, updateUserPage, userData, userListPage, data, setQueryString }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }