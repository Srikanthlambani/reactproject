import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'
import { AccountContext } from './Account';
import Status from './Status';
import Settings from './Settings';
import Homepage from '../OtherExamples/Homepage';
export default function Conformation() {
    const [code, setcode] = useState("");
    const [isloggedin,setisloggedin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {authenticate,getsession,conformation} = useContext(AccountContext);
    const { pool, username } = location.state || {};
    useEffect(() => {
    }, [location.state]);
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("inside the conformation ",pool,username);
        conformation(username, pool, code)
        .then((data)=>{
            if(data)
            {
                alert('Account is successfully created and verified')
                navigate('/')
            }
            else
            {
                alert(`Invalid code is provided please check`)
            }
        })
        .catch((err)=>{
            console.log("failed to conform ",err);
            alert(`Conformation failed because of some error ${err}`)
        })
    };
        return (
            <div className="background-blur">
                <form onSubmit={onSubmit}>
                    <label htmlFor='code'>Conformation Code</label>
                    <input 
                        id='code' 
                        value={code} 
                        onChange={(event) => setcode(event.target.value)} 
                    />
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
        </div>
        );
    }