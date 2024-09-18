
import './App.css';
import Addproduct from './Component/Addproduct';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Registration from './Component/Registration';
import Updateproduct from './Component/Updateproduct';
import Protected from './Component/Protected';
import Productlist from './Component/Productlist';
import Searchproduct from './Component/Searchproduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        <Route path='/' element={<Protected cm = {Productlist}/>}></Route>
        <Route path='/updateproduct/:id' element={<Protected cm = {Updateproduct}/>}></Route>
        <Route path='/addproduct' element={<Protected cm = {Addproduct}/>}></Route>
        <Route path='/searchproduct' element={<Protected cm = {Searchproduct}/>}></Route>
      </Routes>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
