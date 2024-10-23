import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/basefitFirebase";

const WaitlistForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            // Add a new document to the "waitlist" collection in Firestore
            await addDoc(collection(db, 'waitlist'), {
                name: formData.name,
                email: formData.email,
                dateJoined: new Date()  // Save the current date
            });
            setMessage('Thank you for joining the waitlist!');
            setFormData({ name: '', email: '' });  // Reset form after submission
        } catch (e) {
            console.error('Error adding document: ', e);
            setMessage('Error: Could not submit. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Join Waitlist</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WaitlistForm;
