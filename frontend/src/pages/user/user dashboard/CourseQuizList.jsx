import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";
import CheckQSFStudent from "../../../components/CheckQSFStudent";

const CourseQuizList = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const studentId = localStorage.getItem("studentId");
  // console.log(studentId);

  const [quizData, setQuizData] = useState([]);

  const { course_id } = useParams();
  console.log(course_id);
  // const { data, isLoading, error } = useGetquizsQuery();

  // fatch quizs when page is loaded
  useEffect(() => {
    try {
      axios
        .get(baseUrl + `fetch-assigned-quiz/${course_id}`)
        .then((response) => {
          console.log(response.data);
          setQuizData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    document.title = "Quiz List";
  }, [course_id]);

  console.log(quizData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Quiz List</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Quiz</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.map((row, index) => (
                      <tr>
                        <td>{row.quiz.title}</td>

                        <td>
                  

                          {/* <Button as={Link} to={`/take-quiz/${row.quiz.id}`}>
                            {" "}
                            Take Quiz
                          </Button> */}
                          <CheckQSFStudent
                            quiz={row.quiz.id}
                            student={studentId}
                          />
                        </td>
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

export default CourseQuizList;
