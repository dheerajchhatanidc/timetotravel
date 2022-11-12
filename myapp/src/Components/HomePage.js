import React from 'react'
import Nav from './Nav'
import Crousal from './Crousal'
import Top from './Top'
function HomePage() {
  return (
   <>
   <Nav/>

 <Crousal></Crousal>
<div >
<p className='text-center text-4xl bg-blue-500 oc'>OUR COMMUNITY</p>
<p className='text-center m-4 we text-2xl'>
  We bring together a community of people who love to travel. 
  We offer a free platform where you can map out your 
  upcoming travels and organise them into a travel plan, 
  create your own travel blog  discuss about experiences and alot more!
  </p>


</div>
<Top/>
   </>
  )
}

export default HomePage