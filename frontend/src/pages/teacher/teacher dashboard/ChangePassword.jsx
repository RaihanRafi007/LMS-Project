import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";

const TeacherChangePassword = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [teacherData, setTeacherData] = useState({
    password: "",
  });

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("password", teacherData.password);

    try {
      axios
        .post(baseUrl + `teacher/change-password/${teacherId}`, formData)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            window.location.href = "/teacher-logout";
          } else {
            alert("Oops... Some error occured");
          }
        });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };
  console.log(teacherData);

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher-login";
  }

  useEffect(() => {
    document.title = "Teacher Change Password";
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
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
                        value={teacherData.password}
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                  </Form.Group>
                  <Button type="submit" size="sm">
                    {" "}
                    Update
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

export default TeacherChangePassword;
