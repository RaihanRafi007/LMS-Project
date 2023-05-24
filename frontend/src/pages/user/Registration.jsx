import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../hocs/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useCreateTeacherMutation } from "../../app/techers/teacherApi";

const Registration = () => {
  const baseUrl = "http://127.0.0.1:8000/api/student/";
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    interests: "",
    status: "",
    otp_digit: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };
  console.log(studentData);

  const submitHandler = () => {
    const otp_digit = Math.floor(100000 + Math.random() + 900000);
    const formData = new FormData();
    formData.append("full_name", studentData.full_name);
    formData.append("email", studentData.email);
    formData.append("password", studentData.password);
    formData.append("username", studentData.username);
    formData.append("interested_categories", studentData.interests);
    formData.append("otp_digit", otp_digit);

    try {
      axios.post(baseUrl, formData).then((response) => {
        console.log(response);
        // navigate("/varify-teacher/" + response.data.id);
        window.location.href = "/varify-student/" + response.data.id;

        // setStudentData({
        //   full_name: "",
        //   email: "",
        //   password: "",
        //   username: "",
        //   interests: "",
        //   status: "success",
        // });
      });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Student Register";
  }, []);

  return (
    <Layout>
      <Container>
        <Card bg="light">
          <Card.Header align="center" as="h5">
            User Register
          </Card.Header>
          {/* {studentData.status === "" && (
            <p className="text-danger">All fields are required.</p>
          )} */}
          {studentData.status === "success" && (
            <p className="text-success">Thanks for your registration.</p>
          )}
          {studentData.status === "error" && (
            <p className="text-danger">Something wrong happened.</p>
          )}
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicFullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="full_name"
                  value={studentData.full_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={studentData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  required
                />
              </Form.Group>

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
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={studentData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicInterests">
                <Form.Label>Interests</Form.Label>
                <Form.Control
                  name="interests"
                  as="textarea"
                  placeholder="Interests"
                  style={{ height: "100px" }}
                  onChange={handleChange}
                  value={studentData.interest}
                  required
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Php, JavaScript, Python, etc
                </Form.Text>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasicInterests">
                <Form.Label>Interests</Form.Label>
                <Form.Control
                  name="interests"
                  as="textarea"
                  placeholder="interests"
                  style={{ height: "100px" }}
                  onChange={handleChange}
                  value={studentData.interests}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Php, JavaScript, Python, etc
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                // onClick={submitHandler}
                // disabled={disabled}
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Registration;
