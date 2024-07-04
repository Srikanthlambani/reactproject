import React, { useState } from 'react';
import Userpool from './Userpool';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
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
        const attributes = [
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'name',
                Value: username
            }
        ];
        Userpool.signUp(username, password, attributes, null, (err, data) => {
            if (err) {
                console.log("Error is ", err);
                return;
            }
            console.log(data);
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
                {errors.username && <div className="error">{errors.username}</div>}
                <label htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    id='email' 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <label htmlFor='password'>Password</label>
                <input 
                    type='password' 
                    id='password' 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                {errors.password && <div className="error">{errors.password}</div>}
                <button type='submit'>Signup</button>
                <button type="button" onClick={() => navigate('/')}>Login</button>
            </form>
        </div>
    );
}
