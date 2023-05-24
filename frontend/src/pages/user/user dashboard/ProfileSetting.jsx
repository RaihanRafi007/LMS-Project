import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/category/categoryApi";
import Swal from "sweetalert2";
import Layout from "../../../hocs/Layout";
import axios from "axios";
import Sidebar from "../../../components/user/Sidebar";

const ProfileSetting = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    username: "",
    interested_categories: "",
    prev_img: "",
    p_img: "",
    login_via_otp: "",
  });

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);

  // Fetch current student data when page loads
  useEffect(() => {
    try {
      axios.get(baseUrl + `student/${studentId}`).then((response) => {
        console.log(response.data);
        setStudentData({
          full_name: response.data.full_name,
          email: response.data.email,
          username: response.data.username,
          interested_categories: response.data.interested_categories,
          prev_img: response.data.profile_img,
          p_img: "",
          login_via_otp: response.data.login_via_otp,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("full_name", studentData.full_name);
    formData.append("email", studentData.email);
    formData.append("username", studentData.username);
    formData.append("interested_categories", studentData.interested_categories);
    formData.append("login_via_otp", studentData.login_via_otp);

    if (studentData.p_img !== "") {
      formData.append("profile_img", studentData.p_img, studentData.p_img.name);
    }

    try {
      axios
        .put(baseUrl + `student/${studentId}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            Swal.fire({
              title: "Data has been updated!",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showCancelButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };

  const handleFileChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.files[0],
    });
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
    document.title = "My Profile";
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
              <Card.Header>Profile Setting</Card.Header>
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
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="email"
                        value={studentData.email}
                        onChange={handleChange}
                        type="email"
                        defaultValue="email@example.com"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextProfileImage"
                  >
                    <Form.Label column sm="2">
                      Profile Image
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        // value={courseData.p_img}
                        onChange={handleFileChange}
                        name="p_img"
                        id="p_img"
                        type="file"
                      />
                      {studentData.prev_img && (
                        <Image
                          src={studentData.prev_img}
                          alt={studentData.full_name}
                          width="300"
                        />
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name="username"
                      value={studentData.username}
                      onChange={handleChange}
                      type="text"
                      placeholder="Username"
                      style={{ height: "100px" }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicInterested_categories"
                  >
                    <Form.Label>Interested_categories</Form.Label>
                    <Form.Control
                      name="interested_categories"
                      value={studentData.interested_categories}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Interested_categories"
                      style={{ height: "100px" }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Php, Python, Java, JavaScript, C++
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLoginViaOtp">
                    <Form.Label>Login Via OTP</Form.Label>
                    <Form.Control
                      name="login_via_otp"
                      value={studentData.login_via_otp}
                      onChange={handleChange}
                      type="text"
                      placeholder="Login Via OTP"
                      required
                    />
                  </Form.Group>
                  <Button type="submit"> Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfileSetting;
