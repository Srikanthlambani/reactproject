import React, {useContext, useState} from "react";
import { AccountContext } from "./Account";

export default () => {
    const [password,setPassword ] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const {getsession} = useContext(AccountContext);
    const onSubmit = (event) => {
        event.preventDefault();
        getsession()
        .then(({user})=>{
            user.changePassword(password,newPassword,(err,result)=>{
                if(err)
                {
                    console.error(err);
                }
                else{
                    console.log(result);
                }
            })
        })
        .catch((err)=>{
            console.log("error is ",err);
        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Current Password</label>
                <br></br>
                <input value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <label>New Password</label>
                <input value={newPassword} onChange={(event)=>setNewPassword(event.target.value)}></input>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}