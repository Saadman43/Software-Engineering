import React, { useState } from 'react';
import { useCart } from './AddToCart';
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RegistrationPanel = () => {
    const navigate = useNavigate();
    const { rightPanel, setRightPanelVisibility } = useCart();
    const [name, setName] = useState("");
    const [user_name, setUserName] = useState("");
    const [mobile_number, setMobileName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationError, setRegistrationError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const registerUser = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const formValues = { name, user_name, mobile_number, email, password, role: "customer" };
        fetch('http://127.0.0.1:8000/user_registration', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.detail && data.detail == "OTP Sent") {
                    setRightPanelVisibility('registrationPanel');
                    navigate("/Otp?email=" + email);
                } else {
                    setRegistrationError(data.detail ? data.detail : data);
                }
            });
    }
    return (
        <div id="right-panel-registration" className={rightPanel && rightPanel['registrationPanel'] ? 'active' : ""}>
            <div className="login-container">
                <div className="d-flex">
                    <h2 className="login-title">Registration</h2>
                    <X id="close-button" onClick={() => setRightPanelVisibility('registrationPanel')} />
                </div>
                <div className="form-group">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" id="Name" name="Name" required />
                </div>
                <div className="form-group">
                    <input value={mobile_number} onChange={e => setMobileName(e.target.value)} type="text" placeholder="Mobile number" id="Mobile number" name="Mobile number" required />
                </div>
                <div className="form-group">
                    <input value={user_name} onChange={e => setUserName(e.target.value)} type="text" placeholder="User Name" id="User Name" name="User Name" required />
                </div>
                <div className="form-group">
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" required />
                </div>
                {registrationError ? <div style={{ padding: "10px", color: "red", marginBottom: "30px" }}>{registrationError}</div> : null}
                <button type="submit" className="cursorPointer" onClick={registerUser}>Submit</button>
            </div>
        </div>
    )
}

export default RegistrationPanel;