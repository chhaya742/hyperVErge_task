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


    const loginPage = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user/login", data);
            console.log(response);
            if (response.data.status) {

                setLogin(response.data.data)

                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("/dashboard");
            } else {
                toast.error(response.data.messages);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signupPage = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user/create", data);
            if (response.data.status) {
                setUser(response.data)
                toast.success(response.data.messages)

                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("/notes-list")

            } else {
                toast.error(response.data.messages)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUserPage = async (userData) => {
        console.log(userData);
        try {
            const response = await axios.post("http://localhost:4000/user/update", userData);
            // console.log(response.data);
            if (response.data.status) {
                setUpdateUser(response.data.data)
                navigate("/user-profile")
            } else {
                toast.error(response.data.messages)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const userListPage = async (data) => {
        try {
            const response = await axios.get("http://localhost:4000/user/getById", data);
            console.log(data); if (response.data.status) {
                setUserData(response.data.data)
                navigate("/dashboard")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ loginPage, signupPage, updateUserPage, userData, userListPage, setQueryString }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }