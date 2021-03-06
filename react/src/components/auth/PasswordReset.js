import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import axiosClient from "../../utils/axios";
import { useParams } from "react-router";
import ModalAlert from "../ModalAlert";
import useStateWithValidation from "../../hooks/useStateWithValidation";

export default function PasswordReset() {
  const history = useHistory();

  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [header, setHeader] = useState("Success");

  const { token, id } = useParams();
  console.log(token, id);

  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [loginFormPassword, handleLoginFormPassword, isValidPw1] =
    useStateWithValidation((name) => name.match(passw), "");

  const [loginFormPassword2, handleLoginFormPassword2] = useStateWithValidation(
    (name) => name.match(passw),
    ""
  );

  console.log(loginFormPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPw1) {
      setHeader("Password Reset Failed");
      setMessage(
        "passwords must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
      setMessageCount(messageCount + 1);
      return 1;
    }

    if (loginFormPassword != loginFormPassword2) {
      setHeader("Password Reset Failed");
      setMessage("Passwords must match");
      setMessageCount(messageCount + 1);
      return 1;
    }

    const body = {
      userId: id,
      password: loginFormPassword,
      token: token,
    };
    console.log(body);

    const login = await axiosClient({
      method: "post",
      url: "/users/reset/resetPassword",
      data: body,
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage(`Password reset!`);
          setMessageCount(messageCount + 1);

          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      })
      .catch((e) => {
        if (e) {
          setHeader("Password Reset Fail");
          setMessage(` Something went wrong :( please try again) `);
          setMessageCount(messageCount + 1);
        }
      });
  };

  return (
    <Container
      style={{ color: "white" }}
      className="d-flex justify-content-center"
    >
      <ModalAlert
        header={header}
        message={message}
        messageCount={messageCount}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => handleLoginFormPassword(e.target.value)}
            value={loginFormPassword}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => handleLoginFormPassword2(e.target.value)}
            value={loginFormPassword2}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
}
