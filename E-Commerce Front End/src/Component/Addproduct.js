import { useState } from "react"
import Header from "./Header"
import Button from 'react-bootstrap/Button';

export default function Addproduct()
{

    const[product,setProductName] = useState("")
    const[filepath,setProductImage] = useState("")
    const[discription,setDiscription] = useState("")
    const[prize,setProductPrize] = useState("")


   async function uplodadProduct(e)
    {
        e.preventDefault()
        const  user  = localStorage.getItem("user-info")
        const parsedUser = JSON.parse(user);
        const formData = new FormData();
        formData.append("srno", parsedUser.id);
        formData.append("product", product);
        formData.append("filepath", filepath); // Append the file
        formData.append("description", discription);
        formData.append("prize", prize);

        try{

            const response =  await fetch("http://localhost:8000/addproduct",{
                 method:"POST",
                 body:formData
             })

             const result = await response.json()

             console.log("Response add product : ",result)
        }
        catch(err)
        {    
            throw new Error(err)
        }

    }


    return(
        <div>
            <div>
             <Header/>
            <h1>Add product Page</h1>
             <br></br><br></br>
          <form onSubmit={uplodadProduct} enctype="multipart/form-data" method="POST">
             <input placeholder="Enter product name" type='text' required name="product" value={product} onChange={(e)=>{setProductName(e.target.value)}}></input>
            <br></br><br></br>
            <input  type='file' required name="filepath"  onChange={(e)=>{setProductImage(e.target.files[0])}}></input>
            <br></br><br></br>
            <input placeholder="Enter discription" type='text' required name="discription" value={discription} onChange={(e)=>{setDiscription(e.target.value)}}></input>
            <br></br><br></br>
            <input placeholder="Enter prize" type='text' required name="prize" value={prize} onChange={(e)=>{setProductPrize(e.target.value)}}></input>
            <br></br><br></br>
       
            <Button type="submit">Add Product</Button>
            </form>
            </div>
        </div>
    )
}