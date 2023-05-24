import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const CheckQSFStudent = (props) => {
  console.log(props);
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState([]);
  // const studentId = localStorage.getItem("studentId");
  // console.log(studentId);

  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}fetch-quiz-attempt-status/${props.quiz}/${props.student}`
        )
        .then((response) => {
          console.log(response.data);
          setQuizData(response.data);
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
  console.log(quizData);

  return (
    <td>
      {quizData.bool === true ? (
        <span className="text-success">Attempted</span>
      ) : (
        <Button
          size="sm"
          as={Link}
          to={`/take-quiz/${props.quiz}`}
          variant="success"
          //   onClick={() => assignQuiz(props.quiz)}
        >
          Take Quiz
        </Button>
      )}
    </td>
  );
};

export default CheckQSFStudent;
