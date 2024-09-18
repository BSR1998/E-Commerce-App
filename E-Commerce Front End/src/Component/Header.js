
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
export default function Header()
{

const  user  = localStorage.getItem("user-info")


const parsedUser = JSON.parse(user);

    const navigate = useNavigate()
 

    function logOutFun()
    {
        localStorage.clear()
        navigate("/registration")

    }

    return(
        <div>     
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home">Shopify</Navbar.Brand>
                <Nav className="me-auto">
                    {
                        localStorage.getItem("user-info") ?
                        <>
                           <Nav.Link href="/">Product List</Nav.Link>
                           <Nav.Link href="/addproduct">Add Product</Nav.Link>
                           <Nav.Link href="/searchproduct">Search Product</Nav.Link>
                           
                       
                        </>:
                        <>
                      
                        <Nav.Link href="/login">Login</Nav.Link>
                         <Nav.Link href="/registration">Registration</Nav.Link>
                        </>

                    }
                </Nav>
                {localStorage.getItem("user-info")?<NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">{parsedUser.fname}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOutFun}>Logout</NavDropdown.Item>
                    
                    </NavDropdown>:null}
                    
                </Container>
            </Navbar>

      
        </div>
    )
}