import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLoginTeacherMutation } from "../../app/techers/teacherApi";
import Layout from "../../hocs/Layout";
import { useNavigate, useParams } from "react-router-dom";

const VarifyTeacher = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [errorMsg, setErrorMsg] = useState("");
  const [teacherLoginData, setTeacherLoginData] = useState({
    otp_digit: "",
  });
  let navigate = useNavigate();

  const { teacher_id } = useParams();

  // const [loginTeacher, { isLoading, isSuccess, isError }] =
  //   useLoginTeacherMutation();

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("otp_digit", teacherLoginData.otp_digit);

    axios
      .post(baseUrl + `varify-teacher/${teacher_id}`, formData)
      .then(function (response) {
        console.log(response);
        if (response.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", true);
          localStorage.setItem("teacherId", response.data.teacher_id);
          // navigate("/teacher-dashboard")
          window.location.href = "/teacher-dashboard";
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

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher-dashboard";
  }

  useEffect(() => {
    document.title = "Varify Teacher";
  }, []);

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
                Enter 6 digit OTP
              </Card.Header>
              <Card.Body>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicOTP">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      name="otp_digit"
                      value={teacherLoginData.otp}
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

export default VarifyTeacher;
