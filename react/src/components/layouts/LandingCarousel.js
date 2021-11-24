import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import useWindowSize from "../../hooks/useWindowSize";

export default function LandingCarousel(props) {
  const size = useWindowSize();

  const [landingImgs, setLandingImgs] = useState([
    { url: "" },
    { url: "" },
    { url: "" },
  ]);

  const [landingLinks, setLandingLinks] = useState(["", "", ""]);
  const [landingText, setLandingTexts] = useState(["", "", ""]);

  useEffect(() => {
    const getAssets = async () => {
      await axiosClient({
        method: "get",
        url: "/landingAssets/landings/",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setLandingImgs([...response.data[props.carousel].Images]);
        setLandingLinks([...response.data[props.carousel].Links]);
        setLandingTexts([...response.data[props.carousel].Texts]);
      });
    };
    getAssets();
  }, []);

  return (
    <Container fluid="sm">
      <Carousel style={{ textAlign: "center" }}>
        <Carousel.Item>
          <a aria-label="link to landing carousel image 1" href={landingLinks[0]}>
            <img
              style={
                size.width > 500
                  ? {
                      minWidth: props.minWidth,
                      minHeight: props.minHeight,
                      maxWidth: props.maxWidth,
                      maxHeight: props.maxHeight,
                    }
                  : { width: "100%", height: "100%" }
              }
              src={landingImgs[0].url}
              alt="First slide"
            />
          </a>
          <Carousel.Caption>
            <h3>{landingText[0]}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <a aria-label="link to landing carousel image 2" href={landingLinks[1]}>
            <img
              style={
                size.width > 500
                  ? {
                      minWidth: props.minWidth,
                      minHeight: props.minHeight,
                      maxWidth: props.maxWidth,
                      maxHeight: props.maxHeight,
                    }
                  : { width: "100%", height: "100%" }
              }
              src={landingImgs[1].url}
              alt="Second slide"
            />
          </a>
          <Carousel.Caption>
            <h3>{landingText[1]}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <a aria-label="link to landing carousel image 1" href={landingLinks[2]}>
            <img
              style={
                size.width > 500
                  ? {
                      minWidth: props.minWidth,
                      minHeight: props.minHeight,
                      maxWidth: props.maxWidth,
                      maxHeight: props.maxHeight,
                    }
                  : { width: "100%", height: "100%" }
              }
              src={landingImgs[2].url}
              alt="Third slide"
            />
          </a>
          <Carousel.Caption>
            <h3>{landingText[2]}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
