import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";

const AddStudyMaterial = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [cats, setCats] = useState([]);

  const { course_id } = useParams();

  const [studyData, setStudyData] = useState({
    title: "",
    description: "",
    upload: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setStudyData({
      ...studyData,
      [e.target.name]: e.target.value,
    });
    console.log(studyData);
  };
  // console.log(handleChange);

  const handleFileChange = (e) => {
    window.URL = window.URL || window.webkitURL;
    var upload = document.createElement("upload");
    upload.src = URL.createObjectURL(e.target.files[0]);

    setStudyData({
      ...studyData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("title", studyData.title);
    formData.append("description", studyData.description);
    formData.append("upload", studyData.upload, studyData.upload.name);
    formData.append("remarks", studyData.remarks);

    try {
      axios
        .post(baseUrl + "study-materials/" + course_id, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Data has been added.",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="h4 text-center">Add Study Material</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={studyData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      value={studyData.description}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Description"
                      style={{ height: "100px" }}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextupload"
                  >
                    <Form.Label column sm="2">
                      Upload
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="upload"
                        // value={studyData.upload}
                        onChange={handleFileChange}
                        type="file"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRemarks">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      name="remarks"
                      value={studyData.remarks}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="This video is focused on basic introduction"
                      style={{ height: "100px" }}
                    />
                    {/* <Form.Text id="passwordHelpBlock" muted>
                      Php, JavaScript, Python, etc
                    </Form.Text> */}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
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

export default AddStudyMaterial;
