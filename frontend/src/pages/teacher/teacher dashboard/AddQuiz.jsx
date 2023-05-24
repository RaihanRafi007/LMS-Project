import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useGetCategoriesQuery } from "../../../app/category/categoryApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";

const AddQuiz = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value,
    });
    console.log(quizData);
  };
  // console.log(handleChange);

  const submitHandler = () => {
    const teacherId = localStorage.getItem("teacherId");

    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("title", quizData.title);
    formData.append("detail", quizData.detail);

    try {
      axios.post(baseUrl + "quiz/", formData).then((response) => {
        console.log(response.data);
        window.location.href = "/add-quiz";
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
              <Card.Header>Add Quiz</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={quizData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      id="title"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDetail">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      name="detail"
                      value={quizData.detail}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="detail"
                      style={{ height: "100px" }}
                      id="detail"
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

export default AddQuiz;
