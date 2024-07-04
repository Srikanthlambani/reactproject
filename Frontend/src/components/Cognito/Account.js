import React, {createContext} from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Usepool from './Userpool';
const AccountContext = createContext();
const Account = (props) => {
    const authenticate = async(Username,Password) =>{
        const user = new CognitoUser({Username,Usepool});
        const authDetails = new AuthenticationDetails({Username,Password});
        return await new Promise((resolve,reject)=>{
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess ", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.log("onFailure ", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired ", data);
                    resolve(data);
                }
            });
        })
    }
    return(
        <AccountContext.Provider value={{authenticate}}>
            {props.children}
        </AccountContext.Provider>
    )
};
export {Account, AccountContext};