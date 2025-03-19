import React, { useState } from "react";
import { Country } from "country-state-city";

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
    });



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const countryOptions = Country.getAllCountries();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
        if (formData.password === formData.confirmPassword) {
            alert("Password change submitted successfully.");
        } else {
            alert("Password does not match");
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
        >
            <div className="sm:flex sm:flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                    <label className="block text-md font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        required
                    />
                </div>
                <div className="md:w-1/2">
                    <label className="block text-md font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        required
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-md font-medium text-gray-700">
                    Work Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${formData.password.length >= 15 ? "border-gray-300" : "border-red-500"
                        } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
                    required
                />
                {formData.password.length < 15 && (
                    <p className="text-red-500 text-sm mt-1">
                        Password must be at least 15 characters.
                    </p>
                )}
            </div>

            <div className="mt-4">
                <label className="block text-md font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="block text-md font-medium text-gray-700">Country</label>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    required
                >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                        <option key={country.isoCode} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Create my account
                </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="#" className="text-indigo-600 underline">
                    Log in
                </a>
            </p>
        </form>
    );
};

export default SignupForm;
