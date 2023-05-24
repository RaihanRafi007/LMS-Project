import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../hocs/Layout";

const UserForgotPassword = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    email: "",
  });

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("email", studentData.email);

    axios
      .post(baseUrl + `student-forgot-password/`, formData)
      .then(function (response) {
        // console.log(response);
        if (response.data.bool === true) {
          setSuccessMsg(response.data.msg);
          setErrorMsg("");
        } else {
          setErrorMsg(response.data.msg);
          setSuccessMsg("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(formData);
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    window.location.href = "/student-dashboard";
  }

  useEffect(() => {
    document.title = "Student Forgot Password";
  }, []);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(studentData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={6} className="offset-3">
            {/* {isError && <p className="text-danger">Something went wrong</p>} */}

            <Card bg="light">
              <Card.Header align="center" as="h5">
                Enter Your Registered Email
              </Card.Header>
              <Card.Body>
                {successMsg && <p className="text-success">{successMsg}</p>}
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      value={studentData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserForgotPassword;
