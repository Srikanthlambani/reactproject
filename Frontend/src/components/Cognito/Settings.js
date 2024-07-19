import React ,{useEffect,useContext, useState} from "react";
import { AccountContext } from "./Account";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
export default() => {
    const {getsession} = useContext(AccountContext);
    const [loggedin,setLoggedin] = useState(false);
    useEffect(()=>{
        getsession()
        .then(()=>{
            setLoggedin(true);
        })
        .catch((err)=>{
            console.log("error is ",err);
        })
    },[])
    return(
        <div>
            {loggedin && (
                <>
                <h2>Settings</h2>
                <ChangePassword />
                <ChangeEmail />
                </>
            )}
        </div>
    )
}