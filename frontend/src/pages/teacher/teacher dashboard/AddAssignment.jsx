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

const AddAssignment = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const { teacher_id } = useParams();
  const { s_id } = useParams();

  console.log("student", s_id);
  console.log("teacher", teacher_id);

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
    console.log(assignmentData);
  };
  // console.log(handleChange);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("teacher", teacher_id);
    formData.append("student", s_id);
    formData.append("title", assignmentData.title);
    formData.append("detail", assignmentData.detail);

    try {
      axios
        .post(baseUrl + `student-assignment/${teacher_id}/${s_id}`, formData)
        .then((response) => {
          // console.log(response.data);
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Assignment has been added.",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            // Save Notification Data
            // const notifData = new FormData();
            // notifData.append("teacher", teacher_id);
            // notifData.append("notif_subject", "assignment");
            // notifData.append("notif_for", "student");
            // notifData.append("student", s_id);
            // axios
            //   .post(baseUrl + `save-notification/`, formData)
            //   .then((response) => {
            //     console.log("Notification added");
            //   });
            // // End Notification
            window.location.reload();
          }
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
              <Card.Header className="h4 text-center">
                Add Assignment
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={assignmentData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDetail">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      name="detail"
                      value={assignmentData.detail}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="detail"
                      style={{ height: "100px" }}
                    />
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

export default AddAssignment;
