import { faDeleteLeft, faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";

const QuizQuestions = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [questionData, setQuestionData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);
  const { quiz_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `quiz-questions/${quiz_id}`).then((response) => {
        console.log(response.data);
        setQuestionData(response.data);
        setTotalresult(response.data.length);
      });
    } catch (error) {
      console.log(error);
    }
    // setQuestionData(data);
  }, [quiz_id]);

  // to={`/delete-question/` + question.id}

  // const Swal = require("sweetalert2");
  const handleDelete = (question_id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Do you want to delete this?",
      icon: "warning",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + `question/${question_id}`).then((response) => {
            Swal.fire("success", "Data has been deleted.");
            try {
              axios
                .get(baseUrl + `quiz-questions/${quiz_id}`)
                .then((response) => {
                  console.log(response.data);
                  setQuestionData(response.data);
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

  console.log(questionData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>All Questions {totalresult}</div>
                <Button
                  variant="success"
                  as={Link}
                  to={`/add-question/${quiz_id}`}
                >
                  Add Question
                </Button>{" "}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Question</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionData.map((question, index) => (
                      <tr>
                        {" "}
                        <td>
                          {" "}
                          <Link to={`/edit-questions/` + question.id}>
                            {question.questions}
                          </Link>{" "}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(question.id)}
                          >
                            <FontAwesomeIcon icon={faDeleteLeft} />
                          </Button>{" "}
                          <Button
                            as={Link}
                            to={`/edit-question/${question.id}`}
                          >
                            <FontAwesomeIcon icon={faFileEdit} />
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

export default QuizQuestions;
