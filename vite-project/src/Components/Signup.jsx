// import React from 'react';
// import { useState } from 'react';
// import './Signup.css';
// import { Link } from 'react-router-dom';

// function Signup() {
//     const [first_name, setFirstName] = useState("");
//     const [last_name, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [registrationError, setRegistrationError] = useState("");

//     const registerUser=async(event)=>{
//         event.preventDefault();
//         const formValues = {first_name, last_name, email, password};
//         fetch('http://127.0.0.1:8000/register', {
//             method: 'post',
//             headers: {'Content-Type':'application/json'},
//             body: JSON.stringify(formValues)    
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             if (data && data.detail === "User Created") {
//                 window.location = "http://localhost:5173/Otp?email=" + email
//             } else{
//                 setRegistrationError(data.detail ? data.detail : data);
//             }
//         });
//     }

//     return (
//         <>
        
//         <div id='signup' className="container">
//             <form action="otp.html" className="signup-form">
//                 <h1 className="log">Sign Up</h1>
//                 <div className="text-field">
//                     <label htmlFor="signup1">First Name</label>
//                     <input value={first_name} onChange={e=>setFirstName(e.target.value)} type="text" id="signup1" placeholder="Enter Your First Name" />
//                 </div>
//                 <div className="text-field">
//                     <label htmlFor="signup2">Last Name</label>
//                     <input value={last_name} onChange={e=>setLastName(e.target.value)} type="text" id="signup2" placeholder="Enter Your Last Name" />
//                 </div>
//                 <div className="text-field">
//                     <label htmlFor="signup3">Email</label>
//                     <input value={email}  onChange={e=>setEmail(e.target.value)} type="text" id="signup3" placeholder="Enter Your Email" />
//                 </div>
//                 <div className="text-field">
//                     <label htmlFor="pass">Create Password</label>
//                     <input value={password} onChange={e=>setPassword(e.target.value)} type="password" id="pass" placeholder="Enter New Password" />
//                 </div>
//                 <button type="submit" className="btn" onClick={e=>registerUser(e)}>Sign Up</button>
//                 <div style={{padding: "10px", color: "red", marginBottom: "30px"}}>{registrationError}</div>
//             </form>
            
//         </div>
        
       
//         </>
//     );
// }


// export default Signup;






// import React from 'react';
import { useState } from 'react';
import style from './Signup.module.css';
import { Link } from 'react-router-dom';

function Signup() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
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
        const formValues = { first_name, last_name, email, password };
        fetch('http://127.0.0.1:8000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.detail === "User Created") {
                    window.location = "http://localhost:5173/Otp?email=" + email;
                } else {
                    setRegistrationError(data.detail ? data.detail : data);
                }
            });
    }

    return (
        <>
            <div id='signup' className={style.container}>
                <form className={style["signup-form"]} onSubmit={registerUser}>
                    <h1 className={style.log}>Sign Up</h1>
                    <div className={style["text-field"]}>
                        <label htmlFor="signup1">First Name</label>
                        <input value={first_name} onChange={e => setFirstName(e.target.value)} type="text" id="signup1" placeholder="Enter Your First Name" required />
                    </div>
                    <div className={style["text-field"]}>
                        <label htmlFor="signup2">Last Name</label>
                        <input value={last_name} onChange={e => setLastName(e.target.value)} type="text" id="signup2" placeholder="Enter Your Last Name" required />
                    </div>
                    <div className={style["text-field"]}>
                        <label htmlFor="signup3">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="signup3" placeholder="Enter Your Email" required />
                    </div>
                    <div className={style["text-field"]}>
                        <label htmlFor="pass">Create Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="pass" placeholder="Enter New Password" required />
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <div style={{ padding: "10px", color: "red", marginBottom: "30px" }}>{registrationError}</div>
                    <h3>You have an account!</h3>
                    <Link to={'/login'} className='btn'>Click here</Link>
                </form>
            </div>
        </>
    );
}

export default Signup;
