import React from "react";
import { Col, Row, Jumbotron, Container } from "reactstrap";
export default function Contact() {
  return (
    <div style={{color:'white'}}>
      <Container fluid>
        <Jumbotron>
          <p className="lead"> Feel free to contact us @</p>
          <hr className="my-2" />
          <p>+1604-792-3666</p>
          <p>45610 Yale Rd #101, Chilliwack, BC V2P 2N2, Canada</p>
          <a href="mailto:bastiongamesbg@gmail.com?subject = Feedback&body = Message">
            bastiongamesbg@gmail.com
          </a>

          <Container>
            <Row>
              <Col sm={6}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.4540934663296!2d-121.96399418431514!3d49.15398847931755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x410b83d1dfe49a63%3A0xe11e5b1e6907ad8e!2sBastion%20Games!5e0!3m2!1sen!2sjp!4v1632062334723!5m2!1sen!2sjp"
                  frameBorder="0"
                  style={{ height: "400px", width: "100%" }}
                  allowFullScreen="true"
                  aria-hidden="false"
                  tabIndex="0"
                />
              </Col>
              <Col sm={6}>
                <h3>Store Hours</h3>
                <p>
                  Monday: <br />
                  12:00 PM - 6:00 PM
                  <br />
                  Tuesday:
                  <br />
                  12:00 PM - 6:00 PM
                  <br />
                  Wednesday:
                  <br />
                  12:00 PM - 6:00 PM
                  <br />
                  Thursday: <br />
                  12:00 PM - 6:00 PM
                  <br />
                  Friday:
                  <br />
                  12:00 PM - 8:00 PM
                  <br />
                  Saturday:
                  <br />
                  12:00 PM - 8:00 PM
                  <br />
                  Sunday:
                  <br />
                  12:00 PM - 8:00 PM
                  <br />
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Container>
      <Container></Container>
    </div>
  );
}
