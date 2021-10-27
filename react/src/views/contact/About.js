import React from 'react'
import { Col, Button, Form, Row, FormGroup, Label, Input, Jumbotron, Container } from 'reactstrap';
import './Contact.css'

export default function About() {
    return (
        <div className='textColor'>
            <Container>
        <Jumbotron>
          <h1 className="display-3">Your premier Chilliwack Hobby Store!</h1>
          <p className="lead">Bastion Games is a local gaming store that specializes in hobby games. We stock, sell, and play Warhammer, Warhammer 40k, Magic the Gathering, yu-gi-oh, Pokemon, Warmachine, Hordes, Firestorm Armada, Pathfinder, D&D, and a plethora of awesome board games! Come down and learn, watch, or play a game or two yourself.</p>
          <hr className="my-2" />


        </Jumbotron>
        </Container>

      </div>
    )
}
