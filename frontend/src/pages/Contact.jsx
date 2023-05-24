import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Layout from "../hocs/Layout";
// import { useCreateTeacherMutation } from "../../app/techers/teacherApi";

const Contact = () => {
  const baseUrl = "http://127.0.0.1:8000/api/contact/";

  const [contactData, setContactData] = useState({
    full_name: "",
    email: "",
    query: "",
    status: "",
  });

  // const [createontact, { isLoading, isSuccess, isError }] =
  //   useCreateontactMutation();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   setContactData(contactData);
  // };

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  console.log(contactData);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("full_name", contactData.full_name);
    formData.append("email", contactData.email);
    formData.append("query_txt", contactData.query);

    try {
      axios.post(baseUrl, formData).then((response) => {
        console.log(response);

        setContactData({
          full_name: "",
          email: "",
          query: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setContactData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col md="7">
            {contactData.status === "success" && (
              <p className="text-success">Thanks for Contacting us</p>
            )}
            {contactData.status === "error" && (
              <p className="text-danger">Something wrong happened!</p>
            )}

            {/* {isSuccess && (
              <p className="text-success">Thanks for your Registration</p>
            )}
            {isError && <p className="text-danger">Something went wrong</p>} */}
            <Card bg="light">
              <Card.Header align="center" as="h5">
                Contact Us
              </Card.Header>
              {/* {successMsg && <p className="text-success">{successMsg}</p>}
        {errorMsg && <p className="text-danger"> {errorMsg} </p>} */}
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="full_name"
                      value={contactData.full_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Full Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicquery">
                    <Form.Label>query</Form.Label>
                    <Form.Control
                      rows="10"
                      name="query"
                      as="textarea"
                      placeholder="Query"
                      style={{ height: "100px" }}
                      onChange={handleChange}
                      value={contactData.query}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    {/* {isLoading ? "Loading..." : "Send"} */}
                    Send
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="5">
            <h3>Address</h3>
            <ListGroup>
              <ListGroup.Item>
                <label className="fw-bold">Address</label>
                <span className="ms-2">Badda, Dhaka, BD</span>{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className="fw-bold">Mobile</label>
                <span className="ms-2">05466465666</span>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <label className="fw-bold">Address</label>
                <span className="ms-2">Badda, Dhaka, BD</span>{" "}
              </ListGroup.Item>{" "}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Contact;
