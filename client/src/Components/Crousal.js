import React from 'react'
import img1 from '../img1.png'
import img2 from '../img2.png'
import img3 from '../img3.png'
import Carousel from 'react-bootstrap/Carousel'

function Crousal() {
  return (
    <div className='' >
  <Carousel prevIcon={null} nextIcon={null} controls={false } indicators={false} slide={true} interval={3000} hover={false} touch={false} pause={false} 
  className=' 	 flex  justify-center m-4 '
  fade

  >
    <Carousel.Item >
     <div  className=' flex  justify-center m-4 '> <img
        className="d-block   car"
        src={'first.jpeg'}
        alt="First slide"
        resize
        car
      />
      </div>
      {/* <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption> */}
    </Carousel.Item>

    <Carousel.Item>
     <div  className=' flex  justify-center m-4 '> <img
        className="d-block car "
        src={'second.jpeg'}
        alt="Second slide"
        
      />
       
  </div>
      {/* <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption> */}
    </Carousel.Item>

    <Carousel.Item>
     <div  className=' flex  justify-center m-4 '> 
     <img
        className="d-block car "
        src={'third.jpeg'}
        alt="Third slide"
        
      />
       
  </div>
      {/* <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption> */}
    </Carousel.Item>
    {/* <Carousel.Item>
      <img
        className="d-block 100 w-100"
        src={img3}
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item> */}
  </Carousel>
  </div>
  )
}

export default Crousal