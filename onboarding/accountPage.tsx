import React, { ChangeEvent, useRef, useState } from "react";
import { Country } from "country-state-city";

// import { Link } from "react-router-dom";

const AccountPage: React.FC = () => {

    interface AccountData {
        displayName: string;
        firstName: string;
        lastName: string;
        email: string;
        country: string;
        password: string;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }



    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("no file");

    const [accountData, setAccountData] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        password: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setAccountData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Profile updated successfully");
    };


    const handlePasswordChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (accountData.password === accountData.oldPassword && accountData.newPassword === accountData.confirmPassword) {
            alert("Password change submitted successfully.");
        } else {
            alert("Password does not match");
        }
    };


    const countryOptions = Country.getAllCountries();



    return (
        <div className="m-5">
            <div
                // Link
                className="flex gap-3">
                <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1725720422/ep_back_typnii.svg" alt="Back Arrow" />
                <p>Account Page</p>
                {/* Link */}
            </div >
            <div className="md:w-1/2 md:mx-auto">
                <form onSubmit={handleProfileUpdate}>
                    <div className="w-20 h-20 mt-5 md:w-24 md:h-24 bg-[url(https://res.cloudinary.com/doijevrqo/image/upload/v1733356709/Pickle_Rob_h1jnqs.png)] bg-contain rounded-full relative">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={({ target: { files } }) => {
                                if (files && files[0]) {
                                    setFileName(files[0].name);
                                    setImage(URL.createObjectURL(files[0]));
                                }
                            }}
                        />
                        <div>
                            {image && <img src={image} alt={fileName} className="w-20 h-20 mt-5 md:w-24 md:h-24 rounded-full object-contain" />}
                            <button className="bg-black w-4 h-4 flex justify-center items-center rounded-full absolute top-16 left-16 md:top-20 md:left-20"
                                onClick={handleImageClick}
                                type="button">
                                <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1725719429/upload_g6rhki.png" alt="Upload" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-md font-medium text-gray-700">Display Name</label>
                        <input
                            name="displayName"
                            value={accountData.displayName}
                            onChange={handleChange}
                            placeholder='others will see this name'
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 "
                            required
                        />
                    </div>
                    <div className="mt-4 md:flex md:gap-10 md:items-center">
                        <div className="md:w-1/2">
                            <label className="block text-md font-medium text-gray-700">First Name</label>
                            <input
                                name="firstName"
                                value={accountData.firstName}
                                onChange={handleChange}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div className="mt-4 md:mt-0 md:w-1/2">
                            <label className="block text-md font-medium text-gray-700">Last Name</label>
                            <input
                                name="lastName"
                                value={accountData.lastName}
                                onChange={handleChange}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-md font-medium text-gray-700">Work email Address</label>
                        <input
                            name="email"
                            value={accountData.email}
                            onChange={handleChange}
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-md font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            value={accountData.password}
                            onChange={handleChange}
                            placeholder="Password 15 or more characters"
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-md font-medium text-gray-700">Country</label>
                        <select
                            name="country"
                            value={accountData.country}
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
                    <div className="mt-5 flex justify-center">
                        <button
                            className="bg-blue-500 p-3 text-white rounded-lg"
                        >
                            Save Changes
                        </button>

                    </div>
                </form>
                <div className="my-9">
                    <h3>Change password</h3>
                    <div className="mt-4 lg:flex lg:gap-5">
                        <div className="mt-4">
                            <label className="block text-md font-medium text-gray-700">Current Password</label>
                            <input
                                name="oldPassword"
                                value={accountData.oldPassword}
                                onChange={handleChange}
                                type="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-md font-medium text-gray-700">New Password</label>
                            <input
                                name="newPassword"
                                value={accountData.newPassword}
                                onChange={handleChange}
                                type="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-md font-medium text-gray-700">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                value={accountData.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center md:justify-end">
                        <button
                            type="button"
                            onClick={(e) => handlePasswordChange(e)} className="bg-blue-500 p-3 text-white rounded-lg"
                        >
                            Save Password
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
