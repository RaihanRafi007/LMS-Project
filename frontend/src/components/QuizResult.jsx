import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const QuizResult = (props) => {
  console.log(props);
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [resultData, setResultData] = useState([]);

  //   const [quizData, setQuizData] = useState([]);
  // const studentId = localStorage.getItem("studentId");
  // console.log(studentId);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}fetch-quiz-result/${props.quiz}/${props.student}`)
        .then((response) => {
          console.log(response.data);
          setResultData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [props.quiz, props.student]);

  //   // assing quiz to the course
  //   const assignQuiz = (quiz_id) => {
  //     const formData = new FormData();
  //     formData.append("teacher", teacherId);
  //     formData.append("course", props.course_id);
  //     formData.append("quiz", props.quiz_id);

  //     try {
  //       axios.post(baseUrl + "quiz-assign-course/", formData).then((response) => {
  //         console.log(response.data);
  //         if (response.status === 200 || response.status === 201) {
  //           window.location.reload();
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Quiz Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Total Questions</th>
              <th>Attempted Questions</th>
              <th>Total Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{resultData.total_questions}</td>
              <td>{resultData.total_attempted_questions}</td>
              <td>{resultData.total_correct_answer}</td>
            </tr>
          </tbody>
        </Table>{" "}
      </Modal.Body>
    </>
  );
};

export default QuizResult;
