import Header from "./Header"
import { useState } from 'react';
import Table from 'react-bootstrap/Table';

export default function Searchproduct()
{

    const[product,setSearch] = useState("")
    const[productArr,setProductList] = useState([])

    async function searchingProduct(e)
    {
        setSearch(e)

        const data = {name:product};
        console.log("Product seatcgh ",data)


        const result = await fetch("http://localhost:8000/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(data)
            })

        const response = await result.json()

        console.log("Response serach data ",response)
        setProductList(response)

    }

    return(
        <div>
            <Header></Header>
            <h1>Search product</h1>
            <input placeholder="Enter product" value={product} onChange={(e)=>{searchingProduct(e.target.value)}}></input>
            <br></br>
            <br></br>
            {
                productArr?
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sr no</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Discription</th>
                    <th>Prize</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        productArr.map((item,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.product_name}</td>
                            <td><img src={`http://localhost:8000/${item.filepath}`} /></td>
                            <td>{item.discription}</td>
                            <td>{item.prize}</td>
                            </tr>
                        ))
                    }
                  
                   
                </tbody>
                </Table>:null
            }
        </div>
    )
}