import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    let Cmp=props.Cmp;
    let navigate = useNavigate();
    useEffect(()=> {
        if(!localStorage.getItem('employee-info')) {
            navigate("/authentication/sign-in")
        }
    },[])
    return (
        <div>
            <Cmp/>
        </div>
    )
}
export default Login