import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../hocs/Layout";
import axios from "axios";
import { useCreateTeacherMutation } from "../../app/techers/teacherApi";
import { useNavigate } from "react-router-dom";

const TeacherRegistration = () => {
  const baseUrl = "http://127.0.0.1:8000/api/teacher/";
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    otp_digit: "",
  });

  // const [createTeacher, { isLoading, isSuccess, isError }] =
  //   useCreateTeacherMutation();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   createTeacher(teacherData);
  // };

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };
  console.log(teacherData);

  // const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  // if (teacherLoginStatus === "true") {
  //   window.location.href = "/teacher/dashboard";
  // }

  const submitHandler = () => {
    const otp_digit = Math.floor(100000 + Math.random() + 900000);
    const formData = new FormData();
    formData.append("full_name", teacherData.full_name);
    formData.append("email", teacherData.email);
    formData.append("password", teacherData.password);
    formData.append("qualification", teacherData.qualification);
    formData.append("mobile_no", teacherData.mobile_no);
    formData.append("skills", teacherData.skills);
    formData.append("otp_digit", otp_digit);

    try {
      axios.post(baseUrl, formData).then((response) => {
        // console.log(response);
        // navigate("/varify-teacher/" + response.data.id);
        window.location.href = "/varify-teacher/" + response.data.id;


      });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Teacher Register";
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {teacherData.status === "success" && (
              <p className="text-success">Thanks for your Registration</p>
            )}
            {teacherData.status === "error" && (
              <p className="text-danger">Something wrong happened!</p>
            )}

            {/* {isSuccess && (
              <p className="text-success">Thanks for your Registration</p>
            )}
            {isError && <p className="text-danger">Something went wrong</p>} */}
            <Card bg="light">
              <Card.Header align="center" as="h5">
                Register
              </Card.Header>
              {/* {successMsg && <p className="text-success">{successMsg}</p>}
        {errorMsg && <p className="text-danger"> {errorMsg} </p>} */}
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="full_name"
                      value={teacherData.full_name}
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
                      value={teacherData.email}
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
                      value={teacherData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicQualification"
                  >
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control
                      name="qualification"
                      value={teacherData.qualification}
                      onChange={handleChange}
                      type="text"
                      placeholder="Qualification"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicMobileNumber"
                  >
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      name="mobile_no"
                      value={teacherData.mobile_no}
                      onChange={handleChange}
                      type="number"
                      placeholder="Mobile Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicSkills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      name="skills"
                      as="textarea"
                      placeholder="Skills"
                      style={{ height: "100px" }}
                      onChange={handleChange}
                      value={teacherData.skills}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Php, JavaScript, Python, etc
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    {/* {isLoading ? "Loading..." : "Register"} */} Register
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

export default TeacherRegistration;
