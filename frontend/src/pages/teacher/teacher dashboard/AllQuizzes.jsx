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
import { Link } from "react-router-dom";
import { useGetquizsQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";

const AllQuizzes = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);

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
  }, [teacherId]);

  console.log(quizData);

  const handleDelete = (quiz_id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Do you want to delete this?",
      icon: "warning",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + `teacher-quiz-detail/${quiz_id}`).then((response) => {
            Swal.fire("success", "Data has been deleted.");
            try {
              axios
                .get(baseUrl + `teacher-quiz/${teacherId}`)
                .then((response) => {
                  console.log(response.data);
                  setQuizData(response.data);
                  setTotalresult(response.data.length);
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("error", "Data has not been deleted.");
        }
      } else {
        Swal.fire("error", "Data has not been deleted.");
      }
    });
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
              <Card.Header>All Quizzes</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Home</th>

                      <th>Total Quizzes</th>
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
                          <Link to={`/enrolled-students/${quiz.id}`}> 123</Link>
                        </td>
                        <td>
                          <Button
                            as={Link}
                            to={`/edit-quiz/${quiz.id}`}
                            variant="info"
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            as={Link}
                            variant="danger"
                            onClick={() => handleDelete(quiz.id)}
                          >
                            Delete
                          </Button>{" "}
                          <Button as={Link} to={`/add-quiz-question/${quiz.id}}`}>
                            Add Question
                          </Button>
                        </td>
                      </tr>

                      // <option key={index} value={cat.id}>{cat.title}</option>
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

export default AllQuizzes;
