import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { useLoginTeacherMutation } from "../../app/techers/teacherApi";
import Layout from "../../hocs/Layout";
import { Link } from "react-router-dom";

const Login = () => {
  const baseUrl = "http://127.0.0.1:8000/api/student/login/";
  const [errorMsg, setErrorMsg] = useState("");

  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("email", studentLoginData.email);
    formData.append("password", studentLoginData.password);

    axios
      .post(baseUrl, formData)
      .then(function (response) {
        console.log(response);
        if (response.data.bool === true) {
          if (response.data.login_via_otp === true) {
            // window.location.href = `/varify-student/${response.data.student_id}`;

            window.location.href =
              "/varify-student/" + response.data.student_id;

            // navigate(`/varify-student/${response.data.id}` );
          } else {
            localStorage.setItem("studentLoginStatus", true);
            localStorage.setItem("studentId", response.data.student_id);
            window.location.href = "/student-dashboard";
            // navigate("/student-dashboard/");
            console.log(response.data);
          }
        } else {
          setErrorMsg(response.data.msg);
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
    document.title = "Student Login";
  }, []);

  const handleChange = (e) => {
    setStudentLoginData({
      ...studentLoginData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(studentLoginData);

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={6} className="offset-3">
            <Card bg="light">
              <Card.Header align="center" as="h5">
                Login
              </Card.Header>
              <Card.Body>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      value={studentLoginData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                    {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      value={studentLoginData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Button type="submit">Login</Button>
                  <p className="mt-2 text-danger">
                    <Link className="text-danger" to="/user-forgot-password">Forgot Password?</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
