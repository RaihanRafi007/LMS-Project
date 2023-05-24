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
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";

const TakeQuiz = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [questionData, setQuestionData] = useState([]);
  //   const [quizData, setQuizData] = useState([]);

  const { quiz_id } = useParams();

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);
  // const { data, isLoading, error } = useGetcoursesQuery();

  // fatch courses when page is loaded
  useEffect(() => {
    try {
      axios.get(baseUrl + `quiz-questions/${quiz_id}/1`).then((response) => {
        console.log(response.data);
        setQuestionData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = "Attempt Quiz";
  }, [quiz_id]);
  console.log(questionData);

  const submitHandler = (question_id, right_ans) => {
    const formData = new FormData();
    formData.append("student", studentId);
    formData.append("quiz", quiz_id);
    formData.append("question", question_id);
    formData.append("right_ans", right_ans);
    try {
      axios.post(baseUrl + "attempt-quiz/", formData).then((response) => {
        // console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          try {
            axios
              .get(
                baseUrl +
                  `quiz-questions/${quiz_id}/next-question/${question_id}`
              )
              .then((response) => {
                console.log(response.data);
                setQuestionData(response.data);
              });
          } catch (error) {
            console.log(error);
          }
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
            <Sidebar />
          </Col>
          <Col md="7">
            <h4 className="mb-4 border-bottom ph-1">Quiz Title</h4>
            {questionData.map((row, index) => (
              <Card>
                <Card.Header>{row.questions}</Card.Header>
                <Card.Body>
                  <Table striped bordered hover variant="dark">
                    {/* <thead>
                    <tr>
                      <th>Quiz</th>
                      <th>Action</th>
                    </tr>
                  </thead> */}
                    <tbody>
                      <>
                        <tr>
                          <td>
                            <Button
                              variant="outline-secondary"
                              onClick={() => submitHandler(row.id, row.ans1)}
                            >
                              {row.ans1}
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Button
                              variant="outline-secondary"
                              onClick={() => submitHandler(row.id, row.ans2)}
                            >
                              {row.ans2}
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Button
                              variant="outline-secondary"
                              onClick={() => submitHandler(row.id, row.ans3)}
                            >
                              {row.ans3}
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Button
                              variant="outline-secondary"
                              onClick={() => submitHandler(row.id, row.ans4)}
                            >
                              {row.ans4}
                            </Button>
                          </td>
                        </tr>
                      </>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TakeQuiz;

// {/* <tr>
// {/* <Form.Check
//   reverse
//   label="Option 1"
//   name="group1"
//   type="radio"
// />
// <td>
//   <Form.Check
//     reverse
//     label="Option 1"
//     name="group1"
//     type="radio"
//   />
// </td>
// <td>
//   <Form.Check
//     reverse
//     label="Option 1"
//     name="group1"
//     type="radio"
//   />
// </td>
// <td>
//   <Form.Check
//     reverse
//     label="Option 1"
//     name="group1"
//     type="radio"
//   />
// </td> */}
// {/* <td></td>
// </tr> */} */}
