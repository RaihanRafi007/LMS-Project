import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../hocs/Layout";

const UserForgotChangePassword = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { student_id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    password: "",
  });

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("password", studentData.password);

    axios
      .post(baseUrl + `student-change-password/${student_id}/`, formData)
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
    document.title = "Student Change Password";
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
                Enter Your Password
              </Card.Header>
              <Card.Body>
                {successMsg && <p className="text-success">{successMsg}</p>}
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicpassword">
                    <Form.Label>password address</Form.Label>
                    <Form.Control
                      name="password"
                      value={studentData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter password"
                      required
                    />
                    {/* <Form.Text className="text-muted">
                We'll never share your password with anyone else.
              </Form.Text> */}
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                  <Button variant="primary" type="submit">
                    Change
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

export default UserForgotChangePassword;
