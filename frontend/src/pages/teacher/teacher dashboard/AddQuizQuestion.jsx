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

const AddQuizQuestion = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const { quiz_id } = useParams();

  const [questionData, setQuestionData] = useState({
    quiz: "",
    questions: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    right_ans: "",
  });

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
    console.log(questionData);
  };
  // console.log(handleChange);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("quiz", quiz_id);
    formData.append("questions", questionData.questions);
    formData.append("ans1", questionData.ans1);
    formData.append("ans2", questionData.ans2);
    formData.append("ans3", questionData.ans3);
    formData.append("ans4", questionData.ans4);
    formData.append("right_ans", questionData.right_ans);
    try {
      axios
        .post(baseUrl + "quiz-questions/" + quiz_id, formData)
        .then((response) => {
          // console.log(response.data);
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Data has been added.",
              icon: "success",
              toast: true,
              timer: 10000,
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

  // const submitHandler = () => {
  //   const formData = new FormData();
  //   formData.append("course", course_id);
  //   formData.append("title", questionData.title);
  //   formData.append("description", questionData.description);
  //   formData.append("video", chapterData.video, chapterData.video.name);
  //   formData.append("remarks", chapterData.remarks);

  //   try {
  //     axios
  //       .post(baseUrl + "chapter/", formData, {
  //         headers: {
  //           "content-type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         window.location.href = "/add-chapter/1";
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="h4 text-center">Add Quiz</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={questionData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAns1">
                    <Form.Label>Ans 1</Form.Label>
                    <Form.Control
                      name="ans1"
                      value={questionData.ans1}
                      onChange={handleChange}
                      type="text"
                      placeholder="ans1"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAns2">
                    <Form.Label>Ans 2</Form.Label>
                    <Form.Control
                      name="ans2"
                      value={questionData.ans2}
                      onChange={handleChange}
                      type="text"
                      placeholder="ans2"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicans3">
                    <Form.Label>Ans 3</Form.Label>
                    <Form.Control
                      name="ans3"
                      value={questionData.ans3}
                      onChange={handleChange}
                      type="text"
                      placeholder="ans3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicans4">
                    <Form.Label>Ans 4</Form.Label>
                    <Form.Control
                      name="ans4"
                      value={questionData.ans4}
                      onChange={handleChange}
                      type="text"
                      placeholder="ans4"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicright_ans">
                    <Form.Label>Right ans</Form.Label>
                    <Form.Control
                      name="right_ans"
                      value={questionData.right_ans}
                      onChange={handleChange}
                      type="text"
                      placeholder="right_ans"
                      required
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

export default AddQuizQuestion;
