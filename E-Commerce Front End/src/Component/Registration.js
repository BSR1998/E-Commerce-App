import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from "./Header"
import { useNavigate } from 'react-router-dom';
export default function Registration()
{

    const[fname,setFName] = useState("")
    const[lname,setLName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPsw] = useState("")

    const history = useNavigate()

    function setFirstNameFun(e)
    {
        setFName(e.target.value)
    }

    function setLastNameFun(e)
    {
        setLName(e.target.value)
    }

    function setEmailFun(e)
    {
        setEmail(e.target.value)
    }

    function setPswFun(e)
    {
        setPsw(e.target.value)
    } 

    async function onSignUpClick(e)
    {
        e.preventDefault()
        const data = {fname,lname,email,password}
        
        try {
            const response = await fetch("http://localhost:8000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(data)
            })
        
            const result = await response.json()
            console.log("Result :", result)

            localStorage.setItem("user-info",  JSON.stringify(result.user))
            history("/addproduct")

          } catch (error) {
            console.log("Something went wrong", error)
          }
        
        
        
        
    }

    return(
        <div>
             <Header/>
            <h1>Registration Page</h1>
            <input placeholder="Enter first name" type='text' required name="fname" value={fname} onChange={setFirstNameFun}></input>
            <br></br><br></br>
            <input placeholder="Enter last name" type='text' required name="lname" value={lname} onChange={setLastNameFun}></input>
            <br></br><br></br>
            <input placeholder="Enter email" type='email' required name="email" value={email} onChange={setEmailFun}></input>
            <br></br><br></br>
            <input placeholder="Enter password" type='text' required name="password" value={password} onChange={setPswFun}></input>
            <br></br><br></br>
            <Button onClick={onSignUpClick}>Signup</Button>
        </div>
    )
}