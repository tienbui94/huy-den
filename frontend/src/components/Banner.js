import React from 'react'
import {Carousel} from 'react-bootstrap'
const Banner = () => {
    return (
        <Carousel interval={3000}>
  <Carousel.Item>
    <img
      height={740}
      className="d-block w-100"
      src="https://cdn.vox-cdn.com/thumbor/KoHueud28ijG7x1ip1llIaDY-WM=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/67817284/vpavic_4291_20201113_0366.0.0.jpg"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      height={740}
      className="d-block w-100"
      src="https://specials-images.forbesimg.com/imageserve/5fb3d1fa8e17f0f68a05b87f/960x0.jpg?fit=scale"
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      height={740}
      className="d-block w-100"
      src="https://cdn.mos.cms.futurecdn.net/HvjfsxzQHCZxpUYTVgyBDM.jpg"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
    )
}

export default Banner
