import {Card,Button,CardBody,CardTitle,CardText,CardSubtitle } from 'reactstrap'
import {Link} from 'react-router-dom'
// import jQuery from 'jquery'
// import $ from 'jquery';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const jwt = require("jsonwebtoken");
const {JWT_KEY}='emfvmvfccmffk123fkfdmcc';

function Login() {
    var [content, setcontent] = useState('');
    var[guestcnt,setguest]=useState(0);
    var[wrong,setwrong]=useState(false)
    let navigate = useNavigate(); 
   var[value,setvalue]=useState(0);
  
  useEffect(
    async function (){
      let cnt3= await axios.get("guest/get");

     setguest(cnt3.data.data)
    }
    
    )
function enterGuest(uid){
  let token=jwt.sign({payload:uid},"emfvmvfccmffk123fkfdmcc");
  Cookies.set("login",token)
  window.location.reload();
}    
   async function guest(){


const name="Guest"+""+(guestcnt+1) ;
const email='none'   
const password='undefined'
const confirmPassword='undefined'

    var data = await axios.post("user/signup", {
      username:name,
        email: email,
        password: password,
        confirmpassword:confirmPassword,
        profileImage:'user.png'
    })

    var data1 = await axios.patch("guest/update")
enterGuest(data.data.body._id)
   }
 
 return (
<div className=' login_bg '>
 <div className='login '> 
  <Card className='card '  
  >
    <CardBody >
      <CardTitle tag="h5" className='text-center font-bold text-blue-500 text-xl m-4'>
        LogIn
      </CardTitle>
    
      <CardSubtitle
        className=" mb-2 text-muted "
        tag="h6"
      >
      
      </CardSubtitle>
      <CardText>
      <div className='text-center m-1 bass	'> Not  a user?&nbsp;  <Link to='/signup' className='text-center hover:font-bold'>  SignIn </Link> 
      </div>
     
       <div className=''> 
       <div className=' '>
      <form action="user/login"   enctype="multipart/form-data" method="post"   >
        <div className='formE'>
      <label className='label'>
   Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
   <input id='2' className='border-3 border-black	tb' autoComplete='off' type="text" name="email" />
 </label>
 <label className='label'>
   Password &nbsp; &nbsp; &nbsp;
   <input id='3' className='border-3 border-black	tb' type="password" name="password" />
 </label>

      {/* <input type="file" name="finalName" accept='image/*' ></input> */}
<div className=' h-16 '>
      <label for="files" class="btn" className='imgForm   upld'  >
        <div className='m-4 label'>Update Profile</div>
      <img src="https://img.icons8.com/nolan/64/upload.png" className='h-14 w-14 mt-2' />
     { value==0?<></>:<div className='font-medium'> 1 File Chosen</div>}
      </label>
      </div>
      
  <input id="files"  type="file" name='image' accept='image/*' className='ip'onChange={(e)=>{

setvalue(e.target.files.length)
e.target.files=null
    }} >
 

  </input>
  
  <div className='text-center'>
  { Cookies.get("wrong")=="true"?
 <div className='invalid'>Invalid Credentials Please Try Again </div>:<></>
}
{
wrong?
<div className='font-red mb-2'>Empty fields found !</div>:<></>

}

      <Button outline className='sign-button hover:bg-blue-500 hover:border-white	  '     onClick={(e) => {
      
      if(document.getElementById('3').value==null||document.getElementById('2').value==null||document.getElementById('3').value==''||document.getElementById('2').value==''){
        
       e.preventDefault();
     setwrong(true)  ;
     
     
     
      }
     }}  type="submit"  value="Upload" >Submit</Button>
      
      </div>    
   
 

      </div>

    </form> 
    <div className='text-center'>
  <Button outline className='sign-button hover:bg-blue-500 hover:border-white mt-4	  ' onClick={()=>guest()}  >Enter as a Guest</Button>
  </div>
    </div> 
    </div>
      </CardText >

    </CardBody>
  </Card>
   

{/* <div>{value+" h"}</div> */}
 </div>
 </div>

)
}

export default Login