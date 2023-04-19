import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLoginTeacherMutation } from "../../app/techers/teacherApi";
import Layout from "../../hocs/Layout";

const TeacherLogin = () => {
  const baseUrl = "http://127.0.0.1:8000/api/teacher/login/";
  const [errorMsg, setErrorMsg] = useState("");

  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginTeacher, { isLoading, isSuccess, isError }] =
    useLoginTeacherMutation();
  // const [loginTeacher, { data, isError, isLoading }] = useLoginTeacherMutation();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   loginTeacher(teacherLoginData);
  // };
  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);
  //   const teacherLoginData = Object.fromEntries(formData.entries());

  //   loginTeacher(teacherLoginData);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   loginTeacher(teacherLoginData)
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.bool === true) {
  //         localStorage.setItem('teacherLoginStatus', true);
  //         window.location.href = "/teacher-dashboard";
  //       } else {
  //         // handle login error
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     localStorage.setItem("teacherLoginStatus", true);
  //     window.location.href = "/teacher-dashboard";
  //   }
  // }, [isSuccess]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("email", teacherLoginData.email);
    formData.append("password", teacherLoginData.password);

    axios
      .post(baseUrl, formData)
      .then(function (response) {
        console.log(response);
        if (response.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", true);
          localStorage.setItem("teacherId", response.data.teacher_id);

          window.location.href = "/teacher-dashboard";

          // userContext.login(true)
          console.log(response.data);
        } else {
          // console.log(response.data);
          // localStorage.setItem("customer_id", response.data.id);
          // localStorage.setItem("customer_login", true);
          // localStorage.setItem("customer_username", response.data.user);
          // setFormError(false);
          setErrorMsg("Invalid Username or Password.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(formData);
  };

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  const handleChange = (e) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(teacherLoginData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={6} className="offset-3">
            {/* {isError && <p className="text-danger">Something went wrong</p>} */}

            <Card bg="light">
              <Card.Header align="center" as="h5">
                Teacher Login
              </Card.Header>
              <Card.Body>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      value={teacherLoginData.email}
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
                      value={teacherLoginData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
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

export default TeacherLogin;
