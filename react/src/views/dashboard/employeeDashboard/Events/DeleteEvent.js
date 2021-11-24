import React from "react";
import axiosClient from "../../../../utils/axios";
import { Button } from "react-bootstrap";

export default function DeleteEvent(props) {
  console.log(props.id);

  const deleteEvent = async () => {
    await axiosClient({
      method: "delete",
      url: `/event/${props.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <Button variant="danger" onClick={deleteEvent}>
      Delete
    </Button>
  );
}
