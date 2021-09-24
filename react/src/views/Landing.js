import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap'

export default function Landing() {

    const [landingImgs, setLandingImgs] = useState([
        {src:'https://magicstronghold-images.s3.amazonaws.com/sliders/574796403c0e173c5a004af659a10c844ebc9f09.jpg'},
        {src:'https://magicstronghold-images.s3.amazonaws.com/sliders/574796403c0e173c5a004af659a10c844ebc9f09.jpg'},
        {src:'https://magicstronghold-images.s3.amazonaws.com/sliders/574796403c0e173c5a004af659a10c844ebc9f09.jpg'}
    ])

    return (
        <div>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-75"
      src={landingImgs[0].src}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-75"
      src={landingImgs[0].src}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-75"
      src={landingImgs[0].src}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

{/* <div class="fb-page" data-href="https://www.facebook.com/BastionGames" data-tabs="timeline, events" data-lazy="true" data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/BastionGames" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/BastionGames">Bastion Games</a></blockquote></div> */}

        </div>
    )
}
