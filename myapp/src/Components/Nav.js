import { flexbox } from '@mui/system';

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import FlightIcon from '@mui/icons-material/Flight';
// const logo1 = 'logoF.png'
import {Link} from 'react-router-dom'
import { Avatar } from '@mui/material'
import Cookies from 'js-cookie';
function Nav() {
  var [userImage,setuser]=useState('user.png');
  var[username,setusername]=useState('ME')
  function handle(){
   window.location.assign('/home')
  }
  function handle1(){
    window.location.assign('/feed')
   }
   useEffect(()=>{
    call1()
   }
    
    )
    async function call1(){
      const user=await axios.get('user/get');
    
    setuser(user.data.link);
    setusername(user.data.name)
    }
    function logout(){
      Cookies.remove('login')
      window.location.reload();
    }
  return (
    <div >    
   {/* <div className=' flex space-x-8 px-8 py-8 bg-slate-300 	'>
    <img src='logoF.png' className='h-22 w-24'></img>
    <Link to="/home" className='justify-self-end  mt-14  '>HOME</Link>
    <Link to="/feed" className='justify-self-end mt-14 '>FEED</Link>
    </div>
    */}
  
     
      <AppBar position="static" className='nac'   >
       <Toolbar >
          
         
          <Box sx={{ display: 'flex' ,flex:1}}>
         <Typography  className='cursor-default 	ttt' variant="h6" component="div" >
            TIME TO TRAVEL 
          </Typography>
          {/* <FlightIcon className='mb-2  mt-1 ttt1'></FlightIcon> */}
          </Box>

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
            {username}
          </Typography>

         <Avatar src={userImage}></Avatar>
         </Box>
         </Toolbar>
         </Toolbar>
       
      </AppBar>
    
    
    </div>
  )
}

export default Nav
