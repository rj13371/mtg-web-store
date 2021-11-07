import React, { useState, Fragment, useContext } from "react";
import { Form, Input, Button,Row,Col, } from "react-bootstrap";

import axiosClient from "../../../utils/axios";

import CloudinaryWidget from "./CloudinaryWidget";

import { AuthContext } from "../../../context/AuthContext";

const EditLanding = () => {

  const [formData, setFormData] = useState({
    TextsA:'',
    TextsB:'',
    TextsC:'',
LinksA:'',
LinksB:'',
LinksC:'',
CarouselNumber:'0'
  })

  console.log(formData)

  //CLOUDINARY ONLY ALLOWS ONE SET IMAGE SO HAVE TO SEPERATE STATE

  const [imagesA, setImagesA] = useState([{name: '', url: ''}]);
  const [imagesB, setImagesB] = useState([{name: '', url: ''}]);
  const [imagesC, setImagesC] = useState([{name: '', url: ''}]);

  const onChangeImageA = (newImage) => { setImagesA([newImage]) }
  const onChangeImageB = (newImage) => { setImagesB([newImage]) }
  const onChangeImageC = (newImage) => { setImagesC([newImage]) }

  const {
    TextsA,
    TextsB,
    TextsC,
LinksA,
LinksB,
LinksC,
CarouselNumber
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      Images: [imagesA[0], imagesB[0], imagesC[0]],
      Texts:[formData.TextsA, formData.TextsB, formData.TextsC],
      Links:[formData.LinksA, formData.LinksB, formData.LinksC],
      authorizationLevel: authState.authorization_level,
      carouselNumber: formData.CarouselNumber
    };
     

    await axiosClient({
      method: "put",
      url: "/landingAssets/editLanding/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
        console.log(response)
         })


  };




  const { authState } = useContext(AuthContext)



    if(authState.authorization_level=='0' || !authState.authorization_level ){
      return <Fragment>Unauthorized</Fragment>
    }


  return (

    <div>
    <Form onSubmit={onSubmit}>
    <Row form>
      <Col md={6}>

      <Form.Group>
          <Form.Label for="CarouselNumber">Carousel Number? </Form.Label>
          <Form.Control
          width='100px'
          type="number"
          placeholder="ENTER 0 OR 1"
          name="CarouselNumber"
          value={CarouselNumber}
          onChange={onChange}
        />
        </Form.Group>

        <Form.Group>
          <Form.Label for="TextsA">Carousel Text 1</Form.Label>
          <Form.Control
          type="text"
          placeholder="Carousel Text 1"
          name="TextsA"
          value={TextsA}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label for="LinksA">Carousel Link 1</Form.Label>
          <Form.Control
          type="text"
          placeholder="/about"
          name="LinksA"
          value={LinksA}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
    </Row>

    <Row form>
      <Col md={6}>
        <Form.Group>
          <Form.Label for="TextsB">Carousel Text 2</Form.Label>
          <Form.Control
          type="text"
          placeholder="Carousel Text 2"
          name="TextsB"
          value={TextsB}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label for="LinksB">Carousel Link 2</Form.Label>
          <Form.Control
          type="text"
          placeholder="/products/catagory/Warhammer%2040k"
          name="LinksB"
          value={LinksB}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
    </Row>

    <Row form>
      <Col md={6}>
        <Form.Group>
          <Form.Label for="TextsC">Carousel Text 3</Form.Label>
          <Form.Control
          type="text"
          placeholder="Carousel Text 3"
          name="TextsC"
          value={TextsC}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label for="LinksC">Carousel Link 3</Form.Label>
          <Form.Control
          type="text"
          placeholder="https://calendar.google.com/calendar/u/0/r/month/2021/10/2?eid=MmV0MHFjMW0ycm1vczlkaGVxMmhvNjVrY3FfMjAyMTEwMDJUMDIwMDAwWiBnOGw3NWluOW1wcWZrbzJiNnM5MXVkOTIxMEBn&ctz=America/Vancouver&sf=true"
          name="LinksC"
          value={LinksC}
          onChange={onChange}
        />
        </Form.Group>
      </Col>
    </Row>

    <Button type="submit">Edit Landing</Button>
  </Form>
  <Form.Label for="image1">Change Image 1</Form.Label>
  <CloudinaryWidget images={imagesA} onChange={onChangeImageA}/>
  <Form.Label for="image2">Change Image 2</Form.Label>
  <CloudinaryWidget images={imagesB} onChange={onChangeImageB}/>
  <Form.Label for="image3">Change Image 3</Form.Label>
  <CloudinaryWidget images={imagesC} onChange={onChangeImageC}/>

  </div>


  )
}

export default EditLanding

