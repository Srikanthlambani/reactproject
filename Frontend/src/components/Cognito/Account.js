import React, { createContext, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails, confirmRegistration, CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js';
import Pool from './Userpool';

const AccountContext = createContext();

const Account = (props) => {
    const getsession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject();
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const { Name, value } = attribute;
                                        results[Name] = value;
                                    }
                                    resolve(results);
                                }
                            });
                        });
                        resolve({ user, ...session, ...attributes });
                    }
                });
            } else {
                reject();
            }
        });
    };

    const logout = async () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool ,Storage: new CookieStorage(({ domain: 'localhost', secure: 'false' }))});
            const authDetails = new AuthenticationDetails({ Username, Password });
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("data is ",data);
                    resolve(data);
                },
                onFailure: (err) => {
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired ", data);
                    resolve(data);
                }
            });
        });
    };
    const conformation = async (Username, pool, code) => {
        return await new Promise((resolve, reject) => {
            console.log("inside the conformation function pool is ",pool);
            const newPool = new CognitoUserPool(pool);
            const user = new CognitoUser({ Username, Pool:newPool });
            user.confirmRegistration(code, true, function (err, result) {
                if (err) {
                    console.log("errrororo is ",err);
                    alert(err.message || JSON.stringify(err));
                    resolve({messsage:'error had occured '});
                }
                console.log('call result: ' + result);
                if(result=='SUCCESS')
                {
                    resolve(true)
                }
                else
                {
                    resolve(false);
                }
            });
        });
    };

    return (
        <AccountContext.Provider value={{ authenticate, getsession, logout , conformation}}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
