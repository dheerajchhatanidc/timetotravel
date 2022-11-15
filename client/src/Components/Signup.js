import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { set } from 'express/lib/application';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// require { image } from '500px (5).jpeg';

import {Card,Button,CardBody,CardTitle,CardText,CardSubtitle } from 'reactstrap'
 function Signup() {
  var [content, setcontent] = useState('')
  var[color,setcolor]=useState('text-green-700')
  const navigate = useNavigate();

  async function signUp() {

var name =document.getElementById('1');
if(name!=null){


   name=name.value;
}
var email =document.getElementById('2');
if(email!=null){
  email=email.value;
}
var password =document.getElementById('3');
if(password!=null){
  password=password.value;
}
var confirmPassword =document.getElementById('4');
if(confirmPassword!=null){
  confirmPassword=confirmPassword.value;
}
if(confirmPassword==''||password==''||email==''||name==''){
  setcontent('Please fill all details !')  
  setcolor('text-red-600')
  return;
}
if(confirmPassword!=password){
  setcontent('Password should match with confirmPassword')  
  setcolor('text-red-600')
  return;
}
if(confirmPassword.length<5){
  setcontent('Password should be  of atleast 5 length ')  
  setcolor('text-red-600')
  return;
}



    var data = await axios.post("user/signup", {
      username:name,
        email: email,
        password: password,
        confirmpassword:confirmPassword
    })



while(!data);
if(data.data.boolean=='true'){

setcontent(data.data.message)
if(data.data.message.includes('E11000 ')){
  setcontent('Username already exists')
}
setcolor('text-red-600')

}
else{
  setcolor('text-green-700')
  setcontent("SIGNED IN SUCCESSFULLY !")
  setTimeout(function(){
    window.location.href = '/login';
   }, 1000);


}
  
}
  


return (
   <div className='         bg		'   >


<div className="sign" >

  <Card className=' card'  
  
  >
    <CardBody >
      <CardTitle tag="h5" className='text-center font-bold text-blue-500 text-xl'>
        SignIn
      </CardTitle>
      <CardSubtitle
        className=" mb-2 text-muted "
        tag="h6"
      >
        <div className=' flex justify-center'>
      <div > Already a user?&nbsp;  </div>
      <Link to='/login' className='text-center hover:font-bold'>  Login </Link>
      </div>
      </CardSubtitle>
      <CardText>
        <div className='flex justify-center m-4'>
      <div className=' grid grid-cols-1 gap-4 place-content-center	'>
        <div>
     <label className=' w-22 label'>
    Username &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
    <input id='1' className=' max-w-fit	sm:max-w-sm  mx-4 place-self-end	tb	'autoComplete='off' type="text" name="name" />
  </label>
  </div>
  <div>
  <label  className='w-22 label'>
    Email  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <input id='2' className='max-w-fit	sm:max-w-sm mx-4 place-self-center tb	' autoComplete='off'  type="text" name="name" />
  </label>
  </div>
  <div>
  <label className='w-22 label'>
    Password &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <input id='3' className=' max-w-fit	sm:max-w-sm mx-4	tb' type="password" name="name" />
  </label>
  </div>
  <div>
  <label className='w-22 label'>
    Confirm Password
    <input id='4' className='  max-w-fit max-h-fit	sm:max-w-sm mx-4 tb	' type="password"  name="name" />
  </label>
  </div>

  {
  color.includes('red')?<div className='text-center text-red-600	 '>{content}</div>:<div className='text-center text-green-800	 '>{content}</div>}
  </div>
  </div>
      </CardText >
      <div className=' text-center'>
      <Button onClick={signUp} outline className='sign-button hover:bg-blue-500 hover:border-white text-center	 '  >
        Submit
      </Button>
   
      </div>
    </CardBody>
  </Card>
</div>



   </div>
  )
}

export default Signup