import React from 'react'
import Card from 'react-bootstrap/Card'

function Comment() {
  return (
   <>
     
     <Card style={{ width: 'full' }} className='border-xl' >
  <div className='flex justify-center'>
     <button className='m-3' >Add Comment</button>
   <input id='1 '  className=' m-3 border-3 border-black	' type="text" name="title" />
   </div>
   
  </Card>
  
   
   </>
  )
}

export default Comment