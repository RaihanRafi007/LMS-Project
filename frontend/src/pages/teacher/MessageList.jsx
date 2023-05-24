import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const MessageList = (props) => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [messageData, setMessageData] = useState([]);

  // const teacherId = localStorage.getItem("teacherId");
  // console.log(teacherId);

  useEffect(() => {
    try {
      axios
        .get(baseUrl + `get-messages/${props.teacher_id}/${props.student_id}`)
        .then((response) => {
          console.log(response.data);
          setMessageData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // setMessageData(data);
  }, [props.student_id, props.teacher_id]);

  console.log(messageData);

  const fetchMsgs = () => {
    try {
      axios
        .get(baseUrl + `get-messages/${props.teacher_id}/${props.student_id}`)
        .then((response) => {
          // console.log(response.data);
          setMessageData(response.data);
          const objDiv = document.getElementById("msgList");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button type="button" variant="secondary" onClick={fetchMsgs} size="sm" title="Refresh">
        {" "}
        <FontAwesomeIcon icon={faRotate} />{" "}
      </Button>{" "}
      {messageData.map((row, index) => (
        <Row>
          {row.msg_from !== "teacher" ? (
            <Col md={5}>
              <Alert> {row.msg_txt} </Alert>
              <small>{row.msg_time}</small>
            </Col>
          ) : (
            <Col md={{ span: 5, offset: 7 }}>
              {" "}
              <Alert variant="success">{row.msg_txt}</Alert>
              <small>{row.msg_time}</small>
            </Col>
          )}
        </Row>
      ))}
    </>
  );
};

export default MessageList;
