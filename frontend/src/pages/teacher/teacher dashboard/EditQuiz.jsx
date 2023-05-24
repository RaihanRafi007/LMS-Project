import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/category/categoryApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Swal from "sweetalert2";
import Layout from "../../../hocs/Layout";

const EditQuiz = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState({
    title: "",
    detail: "",
  });
  const teacherId = localStorage.getItem("teacherId");
  // console.log(teacherId)

  const { quiz_id } = useParams();
  console.log(quiz_id)

  // Fetch categories when page load
  useEffect(() => {
    try {
      axios.get(baseUrl+`teacher-quiz-detail/${quiz_id}`).then((response) => {
       console.log(response.data);
        setQuizData({
          title: response.data.title,
          detail: response.data.detail
        });
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [quiz_id]);


  const handleChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value,
    });
    console.log(quizData);
  };
  // console.log(handleChange);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("title", quizData.title);
    formData.append("detail", quizData.detail);

    try {
      axios
        .put(baseUrl + `teacher-quiz-detail/${quiz_id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Data has been updated!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showCancelButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


console.log(quizData);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Edit Quiz</Card.Header>
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
                      placeholder="Detail"
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

export default EditQuiz;
