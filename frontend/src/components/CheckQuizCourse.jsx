import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const CheckQuizCourse = (props) => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [quizData, setQuizData] = useState([]);
  //   const { course_id } = useParams();
  const teacherId = localStorage.getItem("teacherId");
  // console.log(teacherId);

  useEffect(
    (props) => {
      try {
        axios
          .get(
            baseUrl + `fetch-quiz-assign-status/${props.quiz}/${props.course}`
          )
          .then((response) => {
            console.log(response.data);
            setQuizData(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  // assing quiz to the course
  const assignQuiz = (quiz_id) => {
    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("course", props.course_id);
    formData.append("quiz", props.quiz_id);

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
    <td>
      {quizData.bool === true ? (
        <Button
          size="sm"
          as={Link}
          variant="success"
          onClick={() => assignQuiz(props.quiz)}
        >
          Assign Quiz
        </Button>
      ) : (
        <span className="text-success">Assigned</span>
      )}
    </td>
  );
};

export default CheckQuizCourse;
