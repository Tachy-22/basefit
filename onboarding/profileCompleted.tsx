import React from "react";

const ProfileCompleted = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
            <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1733195078/task_alt_24dp_314D1C_FILL0_wght400_GRAD0_opsz24_kgjywc.png" height={100} width={100} className="m-auto"
                alt="Profile complete" />
            <p className="text-xl">Congratulations! Your profile is completed</p>
            <button className="bg-amber-400 p-3 rounded-md mt-5">
                View Dashboard
            </button>
        </div>
    )
}
export default ProfileCompleted