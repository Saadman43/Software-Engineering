// import React from 'react';
import { useState } from 'react';
import OtpStyle from './Otp.module.css';
import { useCart } from './AddToCart';
import { useNavigate } from "react-router-dom";

function Otp() {
    const { setRightPanelVisibility } = useCart();
    const [otp, setOtp] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const navigate = useNavigate();

    const verifyOtp = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const formValues = { email, otp };
        fetch('http://127.0.0.1:8000/verify_otp/' + email + "/" + otp)
            .then(res => res.json())
            .then(data => {
                if (data && data.detail === "OTP used") {
                    navigate("/");
                    setRightPanelVisibility('loginPanel');
                } else {
                    setVerificationError(data.detail ? data.detail : data);
                }
            });
    }

    return (
        <div className={OtpStyle.container}>
            <form action="/a" className={OtpStyle["otp-form"]}>
                <h1 className="log">OTP Code</h1>
                <div className={OtpStyle["text-field"]}>
                    <label htmlFor="otp">Confirm OTP</label>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value)} id="otp" className="otp-input" placeholder="Enter OTP Code" />
                    <br />
                    <br />
                    <button className='btn' onClick={e => verifyOtp(e)}>Confirm</button>
                    <div style={{ padding: "10px", color: "red", marginBottom: "30px" }}>{verificationError}</div>
                </div>
            </form>
        </div>
    );
}

export default Otp;
