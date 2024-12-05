import React from "react";

const Verified = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">

            <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1733192786/mark_email_read_100dp_EAC452_FILL0_wght400_GRAD0_opsz48_sblwuj.png" height={100} width={100} className="m-auto"
                alt="mail verified" />
            <p className="my-3 text-2xl">Your mail has been verified</p>
            <p>Kindly connect your wallet to complete your profile.</p>
            <button className="bg-amber-400 p-3 rounded-md mt-5">
                Connect Wallet
            </button>
        </div>
    )
}

export default Verified