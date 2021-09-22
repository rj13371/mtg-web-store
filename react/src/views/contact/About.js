import React from 'react'
import { Col, Button, Form, Row, FormGroup, Label, Input, Jumbotron, Container } from 'reactstrap';

export default function About() {
    return (
        <div>
            <Container>
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">Bastion Games is a local gaming store that specializes in hobby games. We stock, sell, and play Warhammer, Warhammer 40k, Magic the Gathering, yu-gi-oh, Pokemon, Warmachine, Hordes, Firestorm Armada, Pathfinder, D&D, and a plethora of awesome board games! Come down and learn, watch, or play a game or two yourself.</p>
          <hr className="my-2" />
          <p>+1604-792-3666</p>
          <p>45610 Yale Rd #101, Chilliwack, BC V2P 2N2, Canada</p>
          <a href = "mailto:bastiongamesbg@gmail.com?subject = Feedback&body = Message">
          bastiongamesbg@gmail.com</a>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>

        </Jumbotron>
        </Container>

      </div>
    )
}
