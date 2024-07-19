import React, {useState, useContext, useEffect} from "react";
import { AccountContext  } from "./Account";
const Status = () =>{
    const [status, setstatus] = useState(false);
    const { getsession,logout } = useContext(AccountContext);
    useEffect(()=>{
        getsession()
        .then(session => {
            console.log("session: ", session);
            setstatus(true)
        })
        .catch((err)=>{
            console.log("session ",err);
        })
    },[]);
    // if(status)
    // {
    //     return <Homepage />
    // }
    // else
    // {
    //     return <Login />
    // }
    return <div>{status?<><button onClick={logout}>Logout</button><br></br></> : <></>}</div>
}
export default Status;