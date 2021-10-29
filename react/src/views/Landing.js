import React, {useState, Fragment} from 'react'
import LandingCarousel from '../components/layouts/LandingCarousel'
import { Container,Col,Row } from 'react-bootstrap'
import useWindowSize from '../hooks/useWindowSize'

export default function Landing() {

    const size = useWindowSize()

    return (
        <Fragment>
            <LandingCarousel  minWidth={'1300px'} minHeight={'700px'}  maxWidth={'1500px'} maxHeight={'700px'} carousel={0}/>

            <Container fluid style={{padding: '10px'}}>
         <Row>
    <Col lg>
    
    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBastionGames%2F%3Fref%3Dpage_internal&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId" width="370" height="500" lazy='true' scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
           </Col >

           <Col lg>
           <iframe src="https://discord.com/widget?id=883211912731574344&theme=dark" width="320" height="490" allowtransparency="true" frameborder="2" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </Col>

        <Col lg>
        <LandingCarousel minWidth={'666px'} minHeight={'500px'} maxWidth={'666px'} maxHeight={'500px'} carousel={1}/>
        </Col>

  </Row>
</Container>
            </Fragment>
       
    )
}

