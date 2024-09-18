import { useState } from "react"
import Header from "./Header"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function Login()
{

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    async function onSignInClick(e)
    {
        e.preventDefault()
        const data = {email,password}
        try {
            const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(data)
            })
        
            const result = await response.json()
            console.log("Result :", result)

            localStorage.setItem("user-info",  JSON.stringify(result))
            navigate("/addproduct")

          } catch (error) {
            console.log("Something went wrong", error)
          }
    }

  

    return(
        <div>
             <Header/>
            <h1>Login Page</h1>
            
            <input placeholder="Enter email" type='email' required name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <br></br><br></br>
            <input placeholder="Enter password" type='text' required name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br></br><br></br>
           
            <Button onClick={onSignInClick}>Signin</Button>
        </div>
    )
}