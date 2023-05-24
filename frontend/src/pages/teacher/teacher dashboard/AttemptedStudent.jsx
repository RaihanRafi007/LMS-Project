import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetquizsQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";
import CheckQuizCourse from "../../../components/CheckQuizCourse";
import QuizResult from "../../../components/QuizResult";

const AttemptedStudent = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [resultData, setResultData] = useState([]);

  const { quiz_id } = useParams();

  // const { data, isLoading, error } = useGetquizsQuery();

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  useEffect(() => {
    try {
      axios.get(baseUrl + `attempted-quiz/${quiz_id}`).then((response) => {
        console.log(response.data);
        setStudentData(response.data);
      });
    } catch (error) {
      console.log(error);
    }

    // setquizData(data);
    // try {
    //   axios.get(baseUrl + `course/${course_id}`).then((response) => {
    //     console.log(response.data);
    //     setCourseData(response.data);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }, [quiz_id]);

  // assing quiz to the course
  // const assignQuiz = (quiz_id) => {
  //   const formData = new FormData();
  //   formData.append("teacher", teacherId);
  //   formData.append("course", course_id);
  //   formData.append("quiz", quiz_id);

  //   try {
  //     axios.post(baseUrl + "quiz-assign-course/", formData).then((response) => {
  //       console.log(response.data);
  //       if (response.status === 200 || response.status === 201) {
  //         window.location.reload();
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         `${baseUrl}fetch-quiz-result/${props.quiz}/${props.student}`
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         setQuizData(response.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [props.quiz, props.student]);

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
                Student List
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((row, index) => (
                      <tr>
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>
                          {" "}
                          <Button variant="primary" onClick={handleShow}>
                            Quiz Result
                          </Button>
                          <Modal show={show} onHide={handleClose}>
                            <QuizResult
                              quiz={row.quiz.id}
                              student={row.student.id}
                            />
                          </Modal>{" "}
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

export default AttemptedStudent;
