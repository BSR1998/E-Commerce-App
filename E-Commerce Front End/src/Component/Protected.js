import { useEffect } from "react"

import { useNavigate } from "react-router-dom";

export default function Protected(props)
{

    
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem("user-info"))
        {
            console.warn("Not login");
            
          navigate("/login")
        }
    },[])

    return (
        <>
            <props.cm/> 
            
        </> 
    )
}