import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";

const ChangePassword = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [studentData, setStudentData] = useState({
    password: "",
  });

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("password", studentData.password);

    try {
      axios
        .post(baseUrl + `student/change-password/${studentId}`, formData)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            window.location.href = "/student-logout";
          } else {
            alert("Oops... Some error occured");
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };
  console.log(studentData);

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus !== "true") {
    window.location.href = "/student-login";
  }

  useEffect(() => {
    document.title = "Student Change Password";
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Change Password</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      New Password
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="password"
                        onChange={handleChange}
                        value={studentData.password}
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                  </Form.Group>
                  <Button  type="submit" size="sm"> Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ChangePassword;
