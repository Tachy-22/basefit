import React from "react";
import { useState } from "react";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="mt-4">
                <label className="block text-md font-medium text-gray-700">
                    Work Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="block text-md font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Log In
                </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
                Do not have an account?{" "}
                <a href="#" className="text-indigo-600 underline">
                    Sign Up
                </a>
            </p>
        </div>
    )
}

export default Login