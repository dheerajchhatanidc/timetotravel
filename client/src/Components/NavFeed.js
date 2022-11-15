import React from 'react'
import logo1 from '../logo1.png'
import {Link} from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';

// import Search from './Search'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
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

function NavFeed() {
  return (
    <>    
   <div className=' grid grid-cols-4 gap-6 place-content-stretch flex space-x-8 px-8 py-8 bg-slate-300 	'>
    <img src={logo1} className='h-22 w-24'></img>
    
    <textarea className='resize-none mt-10 h-8 w-full border-2 border-black	rounded-xl	'  placeholder="Search Here"></textarea>
   

    <Link to="/home" className='justify-self-end  mt-14  '>HOME</Link>
    <Link to="/feed" className='justify-self-end mt-14 '>FEED</Link>
     
 
    </div>
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    </>
  )
}

export default NavFeed