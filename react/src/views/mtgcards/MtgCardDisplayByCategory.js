import React, { useState, useEffect, useContext } from "react";
import ShoppingCart from "../../components/cart/ShoppingCart";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import EditMtgCard from "./EditMtgCard";
import ReactPaginate from "react-paginate";
import { Fragment } from "react";

export default function MtgCardDisplayBySetName() {
  const { authState } = useContext(AuthContext);

  const [cards, setProducts] = useState([]);

  const [offset, setOffset] = useState(0);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(0);

  const { set_name } = useParams();

  useEffect(() => {
    const grabProducts = async () => {
      await axiosClient({
        method: "get",
        url: `/mtgcards/set_name/${set_name}`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        const data = res.data;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((card) => (
          <Card key={card.id} className="m-auto">
            <Card.Img
              className="w-75 h-75 p-3 m-auto"
              style={{ backgroundBlendMode: "normal" }}
              src={`${card.image_uris.normal}`}
              alt="Card image cap"
            />
            <Card.Body className="m-auto">
              <Card.Title tag="h5">{card.name}</Card.Title>
              <Card.Subtitle tag="h3">{card.set_name} </Card.Subtitle>
              <Card.Text>
                ${card.prices.usd || "0"}// In Stock: {card.stock}{" "}
              </Card.Text>
              <Button
                href={`/mtgcards/${card._id}`}
                variant="primary"
                size="lg"
              >
                {" "}
                Details{" "}
              </Button>{" "}
              <ShoppingCart product={card} stock={card.stock}/>
            </Card.Body>
          </Card>
        ));

        setProducts(postData);
        setPageCount(Math.ceil(data.length / perPage));
      });
    };
    grabProducts();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  return (
    <Fragment>

        <Row xs={1} md={3} className="g-4">
          {cards}
        </Row>

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </Fragment>
  );
}
