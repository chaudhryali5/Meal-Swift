import {  useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminContext } from "../AdminContext";



const AdminContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
            localStorage.setItem("adminToken", urlToken);
            navigate('/');
        } else if (token) {
            localStorage.setItem("adminToken", token);
        } else {
            localStorage.removeItem("adminToken");
        }
    }, [token, searchParams, navigate]);

    const value = {
        token,
        setToken,
        backendUrl
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;