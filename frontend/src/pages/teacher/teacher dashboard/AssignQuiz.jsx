import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetquizsQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";
import CheckQuizCourse from "../../../components/CheckQuizCourse";

const AssignQuiz = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const { course_id } = useParams();

  // const { data, isLoading, error } = useGetquizsQuery();

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  useEffect(() => {
    try {
      axios.get(baseUrl + `teacher-quiz/${teacherId}`).then((response) => {
        console.log(response.data);
        setQuizData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    // setquizData(data);
    try {
      axios.get(baseUrl + `course/${course_id}`).then((response) => {
        console.log(response.data);
        setCourseData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId, course_id]);

  console.log(quizData);

  // assing quiz to the course
  const assignQuiz = (quiz_id) => {
    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("course", course_id);
    formData.append("quiz", quiz_id);

    try {
      axios.post(baseUrl + "quiz-assign-course/", formData).then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
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
              <Card.Header>
                Assogn Quiz{" "}
                <span className="text-primary"> ({courseData.title})</span>{" "}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.map((quiz, index) => (
                      <tr>
                        {" "}
                        <td>
                          {" "}
                          <Link to={`/all-questions/` + quiz.id}>
                            {quiz.title}
                          </Link>{" "}
                        </td>
                        <td>
                          {quiz.assign_status === 0 ? (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => assignQuiz(quiz.id)}
                            >
                              Assign Quiz
                            </Button>
                          ) : (
                            <>
                              <span className="text-success">Assigned</span>
                              &nbsp;
                              <Button
                                size="sm"
                                as={Link}
                                to={`/attempted-student/` + quiz.id}
                                variant="info"
                              >
                                Attempted Students
                              </Button>
                            </>
                          )}
                        </td>
                        {/* 
                          {" "}
                          <CheckQuizCourse quiz={quiz.id} course={course_id} />
                         */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AssignQuiz;
