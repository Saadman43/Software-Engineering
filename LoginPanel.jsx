import React, { useState } from 'react';
import { useCart } from './AddToCart';
import { X } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPanel = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { rightPanel, setRightPanelVisibility } = useCart();

    const loginUser = async (event) => {
        event.preventDefault();
        const formValues = { email, password };
        fetch('http://127.0.0.1:8000/user_login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.access_token) {
                    localStorage.setItem("accessToken", data.access_token);
                    setRightPanelVisibility('loginPanel');
                    const userInfo = jwtDecode(data.access_token);
                    if (userInfo && userInfo.role == 'admin') {
                        navigate('/productList');
                    } else {
                        navigate('/products');
                    }
                } else {
                    setLoginError("Login Failed");
                }
            });
    }

    return (
        <div id="right-panel" className={rightPanel && rightPanel['loginPanel'] ? 'active' : ""}>
            <div className="login-container">
                <div className="d-flex">
                    <h2 className="login-title">LOGIN</h2>
                    <X id="close-button" onClick={() => setRightPanelVisibility('loginPanel')} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {loginError ? <div style={{ padding: "10px", color: "red", marginBottom: "30px" }}>{loginError}</div> : null}
                <button onClick={loginUser}>Sign In</button>
                <div className="form-group">
                    <p>You have no Account? <span id="toggle-button-registration" className="cursorPointer" onClick={() => { setRightPanelVisibility('loginPanel'); setRightPanelVisibility('registrationPanel') }}>Create your account</span></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPanel;