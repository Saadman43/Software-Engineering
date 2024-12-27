import React from 'react';
import { useState } from 'react';
import loginStyle from './Login.module.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const loginUser=async(event)=>{
    event.preventDefault();
    const formValues = { email, password};
    fetch('http://127.0.0.1:8000/login', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formValues)    
    })
    .then(res=>res.json())
    .then(data=>{
        if (data && data.access_token) {
            localStorage.setItem("accessToken", data.access_token)
            window.location = "http://localhost:5173/profile"
        } else{
            setLoginError("Login Failed");
        }
    });
}
  return (
    <div className={loginStyle.container}>
      <form action="#" className={loginStyle["login-form"]} onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
        <h1 className={loginStyle.log}>Log In</h1>
        <div className={loginStyle["text-field"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Add a name attribute for form data access
            placeholder="Enter Username"
            required // Make the field required
            value={email}  
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className={loginStyle["text-field"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Add a name attribute for form data access
            placeholder="Enter Password"
            required // Make the field required
            value={password}  
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <button className={loginStyle.btn} type="submit" onClick={e=>loginUser(e)}>
          Log In
        </button>
        <div style={{padding: "10px", color: "red", marginBottom: "30px"}}>{loginError}</div>
        <p>You have no Account?</p>
        {/* <button className='btn'>Sign up</button> */}
        <Link to={'/Signup'} className={loginStyle.btn}>Click Here &#8594;</Link>
      </form>
      <br /><br />
      
    </div>
  );
};

export default Login;