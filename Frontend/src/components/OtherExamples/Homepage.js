import React, { useContext } from 'react';
import './../Cognito/Login.css';
import { AccountContext } from '../Cognito/Account';
import ChangeEmail from '../Cognito/ChangeEmail';
import ChangePassword from '../Cognito/ChangePassword';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const { logout } = useContext(AccountContext);
    const navigate = useNavigate();
    const options = [
        { 'label': 'ChangeEmail', 'element': 'ChangeEmail' },
        { 'label': 'ChangePassword', 'element': "ChangePassword" },
        { 'label': 'Logout', 'function': logout }
    ];
    const logout_button = async () => {
      logout();
      navigate('/');
  };
    const createDivs = (options) => {
        return options.map((option, index) => {
            //const { label, element: Element, function: func } = option;
            return (
                <>
                <button onClick={() => option.element?navigate(`/${option.element}`):logout_button()}>{option.label}</button>
                <br></br>
                </>
                // <div key={index} onClick={func ? func : null}>
                //     <div>{label}</div>
                //     {Element ? <Element /> : null}
                // </div>
            );
        });
    };

    return (
        <div className='background-blur'>
                {createDivs(options)}
        </div>
    );
}
