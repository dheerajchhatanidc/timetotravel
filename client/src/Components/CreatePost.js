import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar } from '@mui/material'


import CloseIcon from '@mui/icons-material/Close';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CreateIcon from '@mui/icons-material/Create'; 
import React from 'react'
import  { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { val } from 'cheerio/lib/api/attributes';

const jwt = require("jsonwebtoken");
const JWT_KEY='emfvmvfccmffk123fkfdmcc'
function CreatePost() {
var [form,setform]=useState(form?true:false);
var [c,setc]=useState('');
var [user, setuser] = useState(Cookies.get('login'))
var [userid, setuserid] = useState(jwt.verify(user,JWT_KEY).payload)
var[value,setvalue]=useState(0);
var [wrong,setwrong]=useState(false);
var[img,setuserIMG]=useState('')
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
function onclick(){
  setvalue(0)
setform(true)
}
useEffect(
  async function(){
    const user=await axios.get('user/get');
  
  setuserIMG(user.data.link);
  }
  )
 
function oncancel(){
    setform(false)
    document.getElementById('files').files=null
    setvalue(0)
    }
    async function maintask(){
        var title =document.getElementById('1');
        if(title!=null){
        
        
            title=title.value;
        }

        var body =document.getElementById('2');
        if(body!=null){
            body=body.value;
        }
        var media =document.getElementById('5');
        
        if(body==null||title==null||title==''||body==''){
return;
        }

        else{
            const decoded = jwt.verify(user, JWT_KEY);  
            var userId = decoded.payload  
          
            var data = await axios.post("post/createPost", {
            title:title,
            body:body,
            user:userId,
            media:media
           
              })
                oncancel();

        }

    }
    
  return (
  
      <>

<Card sx={{ minWidth: 275 }} className='create '
 onClick={() => {
 setform(true)
}}
       >

      <CardActions >
        <Avatar src={img}></Avatar>
      <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Share your journey !"
      style={{ width: 200,resize:'none',flex:1 }}
      contentEditable='false'
      readOnly
      className='text-area m-1'
    />
       <CreateIcon></CreateIcon>
       <Typography>Post</Typography>
      </CardActions>
    </Card>
   

    {/* <button className='text-center bg-blue-500 text-white border-black h-10 w-23 p-2 m-4 border-3 rounded-md font-bold '  onClick={() => onclick()}  > + CreatePost</button> */}
{
    form==true?  
  
      <div className='z-10 fixed  flex h-3/4 		  w-26 form-encl1' >
    <div className='form' >
  

 {/* <button onClick={() => oncancel()}>Close</button> */}
 
 <form action="post/createPost"   enctype="multipart/form-data" method="post"   >
      
     
      <label className='input'>
   Title
   <TextareaAutosize id='1' className='border-3 border-black title_	' type="text" name="title"   />
 </label>
 <label className='input'>
   Body
   <TextareaAutosize id='2' className='border-3 border-black title_ body2 ' type="text" name="body" />
 </label>

      <label for="files"  className='imgForm  m-1 upld divv'  multiple>
        <div className=' addp'>Add Photos</div>
      <AddPhotoAlternateIcon className='icon m-1'></AddPhotoAlternateIcon>
      { value==0?<></>:<div className='m-4 font-medium'> {value} File Chosen</div>}
      
      </label>{
      wrong?<div className='text-center'>Empty fields found !</div>:<></>}

      <input id="files" type="file" name="image" accept='image/*' multiple className='ip'onChange={(e)=>{

  setvalue(e.target.files.length)
  e.target.files=null
      }}  onclick={(e)=>{

        document.getElementById('files').files=null
      }} ></input>
      <div className='s1p'>
      <Button type="submit"  value="Upload" className='s1' 
      onClick={(e) => {
      
 if(document.getElementById('1').value==null||document.getElementById('2').value==null||document.getElementById('1').value==''||document.getElementById('2').value==''){
   
  e.preventDefault();
setwrong(true)  ;



 }
}} >Post</Button>
      <input id="files" type="file" name="finalName" accept='image/*' multiple className='ip'></input>
      </div>    
 

<CloseIcon  onClick={() => {
 setform(false)
 setwrong(false)
 setvalue(0)
}}   className='close'              ></CloseIcon>

 

    </form>  
    </div>
</div>
 
  
  : <div></div>

}
{/* <div>{userid+" "}</div> */}
  </>


  )
}

export default CreatePost