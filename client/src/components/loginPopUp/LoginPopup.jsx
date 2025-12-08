
import React, { useState, useEffect, useRef, useContext } from "react";
import { StoreContext } from '../../StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { gsap } from "gsap";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)
    const [crrState, setCrrState] = useState("Sign up");
    const formRef = useRef(null);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    // Clear form when switching between Login and Sign Up
    useEffect(() => {
        setData({
            name: "",
            email: "",
            password: ""
        });
    }, [crrState]);

    const onLogin = async (event) => {
        event.preventDefault()

        let newUrl = url;
        if (crrState === "Login") {           // Fixed: was "login" (lowercase)
            newUrl += "/api/v1/login"
        } else {
            newUrl += "/api/v1/register"
        }

        try {
            const response = await axios.post(newUrl, data)

            if (response.data.status) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token)
                toast.success(crrState === "Login" ? "Login successful!" : "Account created!")
                setShowLogin(false)
                // You can close popup here if you have a way
            } else {
                toast.error(response.data.message || "Something went wrong")
                alert(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Server error. Try again.")
        }
    }

    // Animate open on mount
    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        gsap.fromTo(
            formRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
        );
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    // Animate close
    const handleClose = () => {
        gsap.to(formRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            ease: "power3.in",
            onComplete: () => setShowLogin(false),
        });
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <form
                onSubmit={onLogin}
                ref={formRef}
                className="relative bg-white rounded-lg p-4 w-80 shadow-md pointer-events-auto mx-auto mt-20"
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-orange-500 hover:text-white hover:bg-orange-500 rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg transition"
                >
                    ×
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">
                    {crrState}
                </h2>

                {/* Form Inputs */}
                <div className="flex flex-col gap-2 mb-3">
                    {crrState === "Sign up" && (
                        <input
                            type="text"
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Your email"
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        autoComplete="email"
                        required
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                    <input
                        type="password"
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        placeholder="Password"
                        autoComplete={crrState === "Login" ? "current-password" : "new-password"}
                        required
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 text-xs mb-3 " >
                    <input required type="checkbox" className="accent-orange-500" />
                    <p > By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md text-sm hover:bg-orange-600 transition"
                >
                    {crrState === "Sign up" ? "Create Account" : "Login"}
                </button>

                {/* Toggle Form Link */}
                <p className="mt-3 text-center text-xs text-gray-600">
                    {crrState === "Login" ? (
                        <>
                            Create a new account?{" "}
                            <span
                                onClick={() => setCrrState("Sign up")}
                                className="text-orange-500 cursor-pointer hover:underline"
                            >
                                Click here
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={() => setCrrState("Login")}
                                className="text-orange-500 cursor-pointer hover:underline"
                            >
                                Login here
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;
