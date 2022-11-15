import React, { Component }  from 'react';
import  { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import HomePage from './Components/HomePage';
import Feed from './Components/Feed';
import Signup from './Components/Signup';
import {BrowserRouter,Routes,Route,Navigate,Outlet } from 'react-router-dom';
import Login from './Components/Login';
import Cookies from 'js-cookie';
function App() {
  var [isLoggedIn, setis] = useState(Cookies.get('login'))

  const PrivateRoute = () => {
    const auth = isLoggedIn==undefined?false:true // determine if authorized, from context or however you're doing it
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
const PrivateRoute1 = () => {
  const auth = isLoggedIn==undefined?false:true // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  
  return !auth ? <Outlet /> : <Navigate to="/home" />;
}


 
  return (
<BrowserRouter>

<Routes>
<Route exact path='/feed' element={<PrivateRoute/>}>
            <Route exact path='/feed' element={<Feed/>}/>
</Route>

<Route exact path='/home' element={<PrivateRoute/>}>
            <Route exact path='/home' element={<HomePage/>}/>
</Route>

<Route path="/signup" element={<Signup></Signup>}/> 

<Route exact path='/login' element={<PrivateRoute1/>}>
            <Route exact path='/login' element={<Login/>}/>
</Route>
<Route exact path='/' element={<PrivateRoute1/>}>
            <Route exact path='/' element={<Login/>}/>
</Route>


</Routes>
{/* <div>{isLoggedIn+"c"}</div>        */}

</BrowserRouter>


  );
}

export default App;
