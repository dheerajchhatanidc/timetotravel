import Tooltip from '@mui/material/Tooltip';
import CommentIcon from '@mui/icons-material/Comment';
import React from 'react'
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import AddCommentIcon from '@mui/icons-material/AddComment';
import CardActions from '@mui/material/CardActions';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CreateIcon from '@mui/icons-material/Create'; 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, CardContent } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Carousel from 'react-bootstrap/Carousel'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import logo1 from '../logo1.png'
import  { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import {Link} from 'react-router-dom'
import CreatePost from './CreatePost';
import { set } from 'express/lib/application';
import Cookies from 'js-cookie';
import { post } from 'request';
const JWT_KEY='emfvmvfccmffk123fkfdmcc'
const jwt = require("jsonwebtoken");

  
var temp=''
const path = require('path')
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
function Post() {
  var [posts, setpost] = useState([])
  var [isLoggedIn, setis] = useState(Cookies.get('login'))
  var [userImage,setuser]=useState('')
  var [c, setc] = useState('')
  var[boolean,setboolean]=useState(true)
  var [tempArr,setTempArr]=useState([])
  var[commentArr,setCommentArr]=useState([])
  var [hover,sethover]=useState(false)
  var [all,setall]=useState()
  var[arr,setarr]=useState([]);
  var[id5,set_id]=useState(0);
  var[username_,setusername]=useState('ME');
  // var[search,setsearch]=useState([])
  function get(img){
    return path.basename(img)
  }
  function handlehover(){
  // setc(h"HOVER")
sethover(!hover)
  }

  function handle(){
    window.location.assign('/home')
   }
   function handle1(){
     window.location.assign('/feed')
    }
    
   useEffect(
     ()=>
    {

   getall_()
 
  },[])
  async function toggleLike(pid){
   
    const decoded = jwt.verify(isLoggedIn, JWT_KEY);  
    var userId = decoded.payload  
  

    const data= await axios.patch('post/update',{
     id:pid,
     uid:userId,
     likes:0

    })
   await getall_();
    // alert(JSON.stringify(data))
  }
 
  function handleChange(){
  
  let value=document.getElementById("search").value.toLowerCase().trim();
 
  let tempArr=[...posts];
  let valueArr=value.split(" ")
  let tempArr1=[]
  for(let i=0;i<posts.length;i++){
  for(let j=0;j<valueArr.length;j++){
    value=valueArr[j].toLowerCase().trim()
  let obj=posts[i];
  let str=obj.user.username+" "+obj.title+" "+obj.body;
  str=str.toLowerCase().trim();
if(str.includes(value)||value==''){
  if(!tempArr1.includes(obj))
  tempArr1.push(obj._id);
}
}}

setTempArr([...tempArr1])
setboolean(false)


  }
    async function getall_() {
  const data=await  axios.get('post/all')
 
setpost([...data.data.data].reverse())

const decoded = jwt.verify(isLoggedIn, JWT_KEY);  
var userId = decoded.payload  

const user=await axios.get('user/get')

setuser(user.data.link)
setusername(user.data.name)
setarr([...user.data.arr]);
const all= await axios.get("user/all")
  // console.log(all.data.data)
setall(all.data.data)
set_id(userId)
// setc(JSON.stringify(data))
  }
  function handleComment(id){
if(commentArr.includes(id)){
  let temp=[...commentArr]
  let x=[]
 for(let i=0;i<temp.length;i++){
   if(temp[i]!=id){
x.push(temp[i])
   }
 }
 setCommentArr([...x])

}
else{
  let temp=[...commentArr]
  temp.push(id);
  setCommentArr([...temp])
}
  }
  function logout(){
 
    Cookies.remove('login');
    window.location.reload()

  }

async  function likeCmt(cid,pid){
  
    const decoded = jwt.verify(isLoggedIn, JWT_KEY);  
    var userId = decoded.payload  
let res=await axios.patch("post/like",{
  cid:cid,
  pid:pid,
uid:userId
}) 
 await getall_();
// console.log(res)

  }
  async function unlikeCmt(cid,pid){

    const decoded = jwt.verify(isLoggedIn, JWT_KEY);  
    var userId = decoded.payload  
let res=await axios.patch("post/dislike",{
  cid:cid,
  pid:pid,
uid:userId
})
console.log(res)



  }
 async function handleAddComment(value,pid){
    if(value==''||value==null)return
    
value=document.getElementById('current').value;
document.getElementById('current').value=''   
    const decoded = jwt.verify(isLoggedIn, JWT_KEY);  
    var userId = decoded.payload
    const res=await axios.post("post/addComment",{
      pid:pid,
      uid:userId,
      body:value
    },
    )

    await getall_();

document.getElementById('current').value=''

  }
  return (
   <>
  <>    
   {/* <div className=' grid grid-cols-4 gap-6 place-content-stretch flex space-x-8 px-8 py-8 bg-slate-300 	'>
    <img src={logo1} className='h-22 w-24'></img>
    
    <textarea  id='search' className='resize-none mt-10 h-8 w-full border-2 border-black	rounded-xl	' onChange={()=>handleChange()}  placeholder="Search Here"></textarea>
   

    <Link to="/home" className='justify-self-end  mt-14  '>HOME</Link>
    <Link to="/feed" className='justify-self-end mt-14 '>FEED</Link>
    <div className='flex' id='hover' onClick={()=>handlehover()}>
<img src={userImage} className='rounded-full h-20 w-20'></img>   
<div className='m-4'>ME</div>

</div>

    </div> */}
    </>
      <AppBar position="static" className='nac'   >
       <Toolbar >
          
         
          <Box sx={{ display: 'flex' ,flex:1}}>
         <Typography  className='cursor-default 	ttt' variant="h6" component="div" >
            TIME TO TRAVEL 
          </Typography>
          {/* <FlightIcon className='mb-2  mt-1 ttt1'></FlightIcon> */}
         
          </Box>
          <Search className='search1'>
            <SearchIconWrapper className='search1'>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"  onChange={()=>handleChange()} id='search'
              inputProps={{ 'aria-label': 'search' }} className='semibold	'
            />
          </Search>
<Toolbar>
          <Typography  className='cursor-pointer 	' onClick={()=>handle()} variant="h6" component="div"  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            HOME
          </Typography>
          <Typography onClick={()=>handle1()} className='cursor-pointer	' variant="h6" component="div"  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            FEED
          </Typography>
          <Typography onClick={()=>logout()} className='cursor-pointer	' variant="h6" component="div"  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            LOGOUT
          </Typography>
          <Box sx={{ display: 'flex' }}>
          <Typography   className='m-2 cursor-default' variant="h6" component="div"  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
            {username_}
          </Typography>
         <Avatar src={userImage}></Avatar>
         </Box>
         </Toolbar>
         </Toolbar>
       
      </AppBar>
      
<CreatePost/>
      <div className='	center1 space-y-5		  ' >

 {
 
   posts.map((obj)=>(

(tempArr.includes(obj._id)||boolean)?

    <Card style={{ width: 'full' }} 
   className='cardx'>
    <Card.Body>
    <Card.Title className='text-sky-600 text-xs 	'>
      <div className='flex'>
    <Avatar src={obj.user.profileImage}className='rounded-full h-14 w-14'></Avatar>
 <div className='m-2 font-bold username	 text-sm'> {obj.user.username}</div>
 
   </div>
    </Card.Title>
   
      <Card.Title className='mt-3'>{obj.title}</Card.Title>
      <Card.Text >
     {obj.body}
      </Card.Text>{
      ( obj.media!=null && obj.media.length>0)?
      <div  data-bs-interval="false" >
    
      <Carousel 
   interval={null}
   controls={true}
   slide={true}
  className=' 	 flex  justify-center m-4 '
  fade
  variant='dar'
nextIcon={<div className='rounded-full ' ><ArrowForwardIosIcon className='controls rounded-full  '></ArrowForwardIosIcon></div>	}
prevIcon={<div className='rounded-full '><ArrowBackIosIcon className='controls rounded-full  '></ArrowBackIosIcon></div>}

  >
   
      {
        
      obj.media.map((link)=>(

        <Carousel.Item>
        <div  className=' flex  justify-center m-4 '> 
        <img
           className="d-block car "
           src={link}
          
           
         />
          
     </div>
         {/* <Carousel.Caption>
           <h3>Second slide label</h3>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
         </Carousel.Caption> */}
       </Carousel.Item>
      //  <div className='flex justify-center '> 
      //  <img src={link} className='object-center	 pi content-center	 m-4 h-2/4 w-2/4 ' ></img>
       
      //  </div>
   ))
      }
      </Carousel>:<></>
      </div>:<></>}
    </Card.Body>
    <div className='like'>
      {

arr.includes(obj._id)?<ThumbUpIcon onClick={async function(e)  {toggleLike(obj._id)}} ></ThumbUpIcon> :
    <ThumbUpOutlinedIcon onClick={ async function(e) { toggleLike(obj._id)} }> </ThumbUpOutlinedIcon>
      }
    <div onClick={ async function(e) { toggleLike(obj._id)}}>  &nbsp;{obj.likes}</div>
    </div>
  
    <Tooltip title="Add comment" className='m-1'>
      
    <button onClick={()=>handleComment(obj._id)}  className='cmt'>Comments ({obj.comments.length})</button>   
    </Tooltip>
   
    
  
{commentArr.includes(obj._id)?

<>

<Card sx={{ minWidth: 275 }} className='create10 '
 
       >

      <CardActions className='wrapper' >
        <Avatar src={userImage} ></Avatar>
      <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Add a comment... "
      style={{ width: 200,resize:'none',flex:1 }}
      contentEditable='false'
    
      className='text2 m-1'
      id='current'
      type="text" name="title"
    />
      <Button className='m-1 addcmt' onClick={()=>handleAddComment(document.getElementById('current').value,obj._id)} >Add comment &nbsp;
      <AddCommentIcon></AddCommentIcon>
      
      </Button>


      </CardActions>
      <CardContent>
      {
     obj.comments.map((cmt)=>(
       <>
       
  <Card className='inline-block align-middle justify-center border-purple-800 border-1 cmtcard	'>
  
  {/* <div > {cmtImg+"}"}</div> */}
  <div className='flex m-2'>
  <Avatar src={all[cmt.user]} className='h-14 w-14 rounded-full m-1'></Avatar>
<div className='mt-2 mx-1 font-bold'>{cmt.user  }     </div>
</div>
<div className='cmtbody'> {cmt.body}</div>
<div className='flex space-x-4 m-3'>
 
{
  
 
cmt.likes.includes(id5)?
<button onClick={()=>likeCmt(cmt.id,obj._id)} className='flex btn1'> <ThumbUpIcon></ThumbUpIcon> &nbsp;  <div>{cmt.likes.length-1}</div></button>:
<button onClick={()=>likeCmt(cmt.id,obj._id)}  className='flex btn1'><ThumbUpOutlinedIcon></ThumbUpOutlinedIcon> &nbsp;  <div>{cmt.likes.length-1}</div></button>
}
</div>
</Card>     
</>
     ))
   }

      </CardContent>
    </Card>
   

    
  
   
</>
:<div></div>
}
   </Card>:
   <></>
   


   ))

}

{/* <div>{c+ "cc"}</div> */}

      </div>

</>
  )
}

export default Post