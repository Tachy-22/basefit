import React, { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/basefitFirebase";

const WaitlistForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', twitter: '', wallet: '', basename: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {

            // Get the current count of users in the "Waitlist" collection
            const waitlistSnapshot = await getDocs(collection(db, 'Waitlist'));
            const waitlistCount = waitlistSnapshot.size; // Get the number of documents

            // Assign the user a unique ID based on the number of documents
            const userId = waitlistCount + 1;
            // Add a new document to the "waitlist" collection in Firestore
            await addDoc(collection(db, 'Waitlist'), {
                id: userId,
                Name: formData.name,
                Email: formData.email,
                Wallet: formData.wallet,
                Twitter: formData.twitter,
                Basename: formData.basename,
                DateJoined: new Date()
            });
            setMessage('Thank you for joining the waitlist!');
            setFormData({ name: '', email: '', wallet: '', twitter: '', basename: '' });  // Reset form after submission
        } catch (e) {
            console.error('Error adding document: ', e);
            setMessage('Error: Could not submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-gray-600 text-white">
            <h2 className="text-3xl">Basefit</h2>
            <form onSubmit={handleSubmit} className="md:w-1/2 md:mx-auto md:bg-gray-500 md:p-5 rounded">
                <p className="my-7 text-sm md:text-lg md:my-5">Kindly fill in the form to join the waitlist.</p>
                <div className="my-5 flex flex-col">
                    <label>Name:</label>
                    <input
                        className="p-2 border-none outline-none rounded text-black"
                        type="text"
                        name="name"
                        placeholder="firstname lastname"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="my-5 flex flex-col">
                    <label>Email:</label>
                    <input
                        className="p-2 border-none outline-none rounded text-black"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="my-5 flex flex-col">
                    <label>Wallet Address:</label>
                    <input
                        className="p-2 border-none outline-none rounded text-black"
                        type="text"
                        name="wallet"
                        placeholder="Wallet Address"
                        value={formData.wallet}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="my-5 flex flex-col">
                    <label>Base Name:</label>
                    <input
                        className="p-2 border-none outline-none rounded text-black"
                        type="text"
                        name="basename"
                        placeholder="Basename"
                        value={formData.basename}
                        onChange={handleChange}
                    // required
                    />
                </div>
                <div className="my-5 flex flex-col">
                    <label>Twitter</label>
                    <input
                        className="p-2 border-none outline-none rounded text-black"
                        type="text"
                        name="twitter"
                        placeholder="Twitter link"
                        value={formData.twitter}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={`bg-blue-400 p-2 border-none rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>{loading ? 'Submitting...' : 'Join Waitlist'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WaitlistForm;
