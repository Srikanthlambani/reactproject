import React, {useContext, useState} from "react";
import { AccountContext } from "./Account";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export default () => {
    const [password,setPassword ] = useState("");
    const [newemail,setnewemail] = useState("");
    const {getsession,authenticate} = useContext(AccountContext);
    const onSubmit = (event) => {
        event.preventDefault();
        getsession()
        .then(({user})=>{
            let username = null;
            if(user && user.username)
            {
                username = user.username;
            }
            console.log(username,password);
            authenticate(username,password)
                .then(()=>{
                    const attributes = [
                        new CognitoUserAttribute({Name:"email",Value:newemail})
                    ];
                    user.updateAttributes(attributes,(err,results)=>{
                        if(err)
                        {
                            console.log("error is ",err);
                        }
                        else{
                            console.log("result is ",results);
                        }
                    })
                })
                .catch((err)=>{
                    console.log("error is from authenticate function ",err);
                })
        })
        .catch((err)=>{
            console.log("error is ",err);
        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>New Email</label>
                <br></br>
                <input value={newemail} onChange={(event)=>setnewemail(event.target.value)}></input>
                <label>Password</label>
                <input value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}