import { useEffect } from "react"
import Header from "./Header"
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Productlist()
{

    const[productArr,setProducts] = useState([])

    useEffect(()=>{
       getProductList()
    },[])
   
   
    async function getProductList()
    {
        const result =  await fetch("http://localhost:8000/productlist")

        const response = await result.json()

        setProducts(response)
 
        
    }


    async function deleteProduct(id)
    {
       const result = await fetch("http://localhost:8000/product/"+id,{
        method:"DELETE"
       })

       const response = await result.json()

       console.log("delte response ",response)
       alert("Product deleted")
       getProductList()
    }

    return(
        <div>
             <Header/>
            <h1>Product list page</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Discription</th>
                    <th>Prize</th>
                    <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                   
                        {
                            productArr.map((item,index)=>(
                                <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td> <img src={`http://localhost:8000/${item.filepath}`} alt="not avialable" width="250px"/></td>
                                <td>{item.discription}</td>
                                <td>{item.prize}</td>
                                <td><Button onClick={()=>{deleteProduct(item.id)}} variant="danger">Delete</Button> 
                                <br></br>
                                <br></br>
                                <Link to={"/updateproduct/"+item.id}  ><Button  variant="secondary">Update</Button></Link></td>
                           
                                </tr>
                            ))
                        }
                 
                </tbody>
             </Table>

        </div>
    )
}