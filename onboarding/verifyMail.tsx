import React from "react";

const VerifyMail = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">

            <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1733192793/mail_lock_100dp_EAC452_FILL0_wght400_GRAD0_opsz48_yegefw.png" height={100} width={100} className="m-auto"
                alt="verify mail" />

            <h2 className="my-5 text-3xl">Verify your email to continue</h2>
            <p className="">We just sent an email to the address:</p>
            <p className="my-3 text-blue-600">signup email should display here</p>
            <p>Please check your email and select the link provided to verify your address</p>
            <div className="flex mt-5 justify-center gap-5">
                <button className="bg-amber-400 p-3 rounded-md">
                    Send again
                </button>
                <button className="bg-amber-400 p-3 rounded-md">
                    previous page
                </button>
            </div>
        </div>
    )
}

export default VerifyMail