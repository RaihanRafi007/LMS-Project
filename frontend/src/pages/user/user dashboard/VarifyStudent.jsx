import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../hocs/Layout";

const VarifyStudent = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [errorMsg, setErrorMsg] = useState("");
  const [studentLoginData, setStudentLoginData] = useState({
    otp_digit: "",
  });
  let navigate = useNavigate();

  const { student_id } = useParams();

  // const [loginstudent, { isLoading, isSuccess, isError }] =
  //   useLoginstudentMutation();

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("otp_digit", studentLoginData.otp_digit);

    axios
      .post(baseUrl + `varify-student/${student_id}`, formData)
      .then(function (response) {
        console.log(response);
        if (response.data.bool === true) {
          localStorage.setItem("studentLoginStatus", true);
          localStorage.setItem("studentId", response.data.student_id);
          // navigate("/student-dashboard")
          window.location.href = "/student-dashboard";
          console.log(response.data);
        } else {
          setErrorMsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(formData);
  };

  // const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  // if (studentLoginStatus === "true") {
  //   window.location.href = "/student-dashboard";
  // }

  useEffect(() => {
    document.title = "Varify student";
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
            {/* {isError && <p className="text-danger">Something went wrong</p>} */}

            <Card bg="light">
              <Card.Header align="center" as="h5">
                Enter 6 digit OTP
              </Card.Header>
              <Card.Body>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicOTP">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      name="otp_digit"
                      value={studentLoginData.otp}
                      onChange={handleChange}
                      type="number"
                      placeholder="OTP"
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                  <Button type="submit">Varify</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default VarifyStudent;
