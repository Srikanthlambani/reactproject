import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Userpool from './Userpool';
import { useNavigate } from 'react-router-dom';
import './Login.css'
export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };
    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email is not valid";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const user = new CognitoUser({
            Username: username,
            Pool: Userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess ", data);
            },
            onFailure: (err) => {
                console.log("onFailure ", err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired ", data);
            }
        });
    };

    return (
        <div className="background-blur">
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>Username</label>
                <input 
                    id='username' 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                />
                <br></br>
                {errors.username && <div className="error">{errors.username}</div>}
                <label htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    id='email' 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                />
                <br></br>
                {errors.email && <div className="error">{errors.email}</div>}
                {/* <label htmlFor='name'>Name</label>
                <input 
                    id='name' 
                    value={name} 
                    onChange={(event) => setName(event.target.value)} 
                /> */}
                
                <label htmlFor='password'>Password</label>
                <input 
                    type='password' 
                    id='password' 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <br></br>
                {errors.password && <div className="error">{errors.password}</div>}
                <button type='submit'>Login</button>
                <br></br>
                <button type="button" onClick={() => navigate('/signup')}>Signup</button>
            </form>
    </div>
    );
}