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
import TeacherSidebar from "../../../components/teacher/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/category/categoryApi";
import Swal from "sweetalert2";
import Layout from "../../../hocs/Layout";
import axios from "axios";

const TeacherProfileSetting = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: "",
    prev_img: "",
    p_img: "",
    login_via_otp: "",
    facebook_url: "",
    linkedin_url: "",
    github_url: "",
    website_url: "",
  });

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  // Fetch current teacher data when page loads
  useEffect(() => {
    try {
      axios.get(baseUrl + `teacher/${teacherId}`).then((response) => {
        console.log(response.data);
        setTeacherData({
          full_name: response.data.full_name,
          email: response.data.email,
          qualification: response.data.qualification,
          mobile_no: response.data.mobile_no,
          skills: response.data.skills,
          prev_img: response.data.profile_img,
          p_img: "",
          login_via_otp: response.data.login_via_otp,
          facebook_url: response.data.facebook_url,
          linkedin_url: response.data.linkedin_url,
          github_url: response.data.github_url,
          website_url: response.data.website_url,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("full_name", teacherData.full_name);
    formData.append("email", teacherData.email);
    formData.append("qualification", teacherData.qualification);
    formData.append("mobile_no", teacherData.mobile_no);
    formData.append("skills", teacherData.skills);
    formData.append("login_via_otp", teacherData.login_via_otp);
    formData.append("facebook_url", teacherData.facebook_url);
    formData.append("linkedin_url", teacherData.linkedin_url);
    formData.append("github_url", teacherData.github_url);
    formData.append("website_url", teacherData.website_url);

    if (teacherData.p_img !== "") {
      formData.append("profile_img", teacherData.p_img, teacherData.p_img.name);
    }

    try {
      axios
        .put(baseUrl + `teacher/${teacherId}`, formData, {
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
      setTeacherData({ status: "error" });
    }
  };

  const handleFileChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.files[0],
    });
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
    document.title = "Teacher Profile";
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
              <Card.Header>Profile Setting</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicLoginFullname"
                  >
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control
                      name="full_name"
                      value={teacherData.full_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Full Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicLoginFacebookURL"
                  >
                    <Form.Label>Facebook URL</Form.Label>
                    <Form.Control
                      name="facebook_url"
                      value={teacherData.facebook_url}
                      onChange={handleChange}
                      type="text"
                      placeholder="Facebook URL"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicLoginlinkedin_url"
                  >
                    <Form.Label>LinkediIn URL</Form.Label>
                    <Form.Control
                      name="linkedin_url"
                      value={teacherData.linkedin_url}
                      onChange={handleChange}
                      type="text"
                      placeholder="LinkedIn URL"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicLogingithub_url"
                  >
                    <Form.Label>Github URL</Form.Label>
                    <Form.Control
                      name="github_url"
                      value={teacherData.github_url}
                      onChange={handleChange}
                      type="text"
                      placeholder="Github URL"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicLoginwebsite_url"
                  >
                    <Form.Label>Website URL</Form.Label>
                    <Form.Control
                      name="website_url"
                      value={teacherData.website_url}
                      onChange={handleChange}
                      type="text"
                      placeholder="Website URL"
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
                        value={teacherData.email}
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
                      {teacherData.prev_img && (
                        <Image
                          src={teacherData.prev_img}
                          alt={teacherData.full_name}
                          width="300"
                        />
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicSkills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      name="skills"
                      value={teacherData.skills}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Skills"
                      style={{ height: "100px" }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Php, JavaScript, Python, etc
                    </Form.Text>
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
                      as="textarea"
                      placeholder="Qualification"
                      style={{ height: "100px" }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      BCA | MCA
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLoginViaOtp">
                    <Form.Label>Login Via OTP</Form.Label>
                    <Form.Control
                      name="login_via_otp"
                      value={teacherData.login_via_otp}
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

export default TeacherProfileSetting;
