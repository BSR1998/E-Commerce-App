import { useEffect, useState } from "react"
import Header from "./Header"
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";


export default function Updateproduct(props)
{
    const[productName,setProductName] = useState("");
    const[productImg,setProductImg] = useState("");
    const[productDis,setProductDis] = useState("");
    const[productPrize,setProductPrize] = useState("");
    const params = useParams();

    

    useEffect(()=>{
        console.log("Perameter ",params)
        getProductInfo(params.id)
    },[])

   async function getProductInfo(id)
    {
        const result = await fetch("http://localhost:8000/product/"+id)
    
           const response = await result.json()
    
           console.log("get product response ",response)
           
           setProductName(response[0].product_name)
           setProductImg(response[0].filepath)
           setProductPrize(response[0].prize)
           setProductDis(response[0].discription)
           console.log("get product response image ",productImg)
           
    }


    async function updateProduct(e)
    {
        e.preventDefault()
        const formData = new FormData();
        //formData.append("id", params.id);
        formData.append("product", productName);
        formData.append("filepath", productImg); 
        formData.append("description", productDis);
        formData.append("prize", productPrize);
        console.log("FIle Path ",productImg)
        try{

            const response =  await fetch("http://localhost:8000/product/"+params.id,{
                 method:"PUT",
                 body:formData
             })

             const result = await response.json()

             console.log("Response update product : ",result)
        }
        catch(err)
        {    
            throw new Error(err)
        }

    }

    return(
        <div>
             <Header/>
            <h1>Update Product Page</h1>
             <form method="PUT" enctype="multipart/form-data"  onSubmit={updateProduct}>
                <input type="text"  onChange={(e)=>{setProductName(e.target.value)}} value={productName}></input><br></br><br></br>
                <input type="file" onChange={(e)=>{setProductImg(e.target.files[0])}} ></input><br></br><br></br>
                <input type="text" onChange={(e)=>{setProductDis(e.target.value)}} value={productDis}></input><br></br><br></br>
                <input type="text" onChange={(e)=>{setProductPrize(e.target.value)}} value={productPrize}></input><br></br><br></br>
                
                 <img src= {`http://localhost:8000/${productImg}`} width="200px" />
                 <br></br><br></br>
                <Button variant="success" type="submit">Update Product</Button>
             </form>
        </div>
    )
}