import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import MessageList from "../MessageList";

const UserList = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [studentData, setStudentData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [grpErrorMsg, setGrpErrorMsg] = useState("");
  const [grpSuccessMsg, setGrpSuccessMsg] = useState("");

  const [msgData, setMsgData] = useState({
    msg_text: "",
  });

  const [grpMsgData, setGrpMsgData] = useState({
    msg_text: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  const handleChange = (e) => {
    setMsgData({
      ...msgData,
      [e.target.name]: e.target.value,
    });
    console.log(msgData);
  };
  const handleChangeGrp = (e) => {
    setGrpMsgData({
      ...grpMsgData,
      [e.target.name]: e.target.value,
    });
    console.log(grpMsgData);
  };
  // console.log(handleChange);

  const submitHandler = (s_id) => {
    const formData = new FormData();
    formData.append("msg_txt", msgData.msg_text);
    formData.append("msg_from", "teacher");

    try {
      axios
        .post(baseUrl + `send-message/${teacherId}/${s_id}`, formData)
        .then((response) => {
          // console.log(response.data);
          if (response.data.bool === true) {
            setMsgData({
              msg_text: "",
            });
            setSuccessMsg(response.data.msg);
            setErrorMsg("");
            console.log("successMsg", successMsg);
          } else {
            setErrorMsg(response.data.msg);
            setSuccessMsg("");
            console.log("errorMsg", errorMsg);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const grpSubmitHandler = (s_id) => {
    const formData = new FormData();
    formData.append("msg_txt", grpMsgData.msg_text);
    formData.append("msg_from", "teacher");

    try {
      axios
        .post(baseUrl + `send-group-message/${teacherId}`, formData)
        .then((response) => {
          // console.log(response.data);
          if (response.data.bool === true) {
            setGrpMsgData({
              msg_text: "",
            });
            setGrpSuccessMsg(response.data.msg);
            setGrpErrorMsg("");
            console.log("grpSuccessMsg", grpSuccessMsg);
          } else {
            setGrpErrorMsg(response.data.msg);
            setGrpSuccessMsg("");
            console.log("grpSuccessMsg", grpSuccessMsg);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(baseUrl + `fetch-all-enrolled-students/${teacherId}`)
        .then((response) => {
          console.log(response.data);
          setStudentData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // setstudentData(data);
  }, [teacherId]);

  console.log(studentData);

  const msgList = {
    height: "500px",
    overflow: "auto",
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="3">
            <TeacherSidebar />
          </Col>
          <Col md="9">
            <Card>
              <Card.Header>
                All Student List{" "}
                <Button
                  className="ms-1"
                  size="sm"
                  title="Send Message"
                  onClick={handleShow2}
                >
                  {" "}
                  <FontAwesomeIcon icon={faRocketchat} />
                </Button>
              </Card.Header>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Send message to all students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {grpSuccessMsg && (
                    <p className="text-success">{grpSuccessMsg}</p>
                  )}
                  {grpErrorMsg && <p className="text-danger">{grpErrorMsg}</p>}
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        value={grpMsgData.msg_text}
                        name="msg_text"
                        as="textarea"
                        type="text"
                        rows="10"
                        onChange={handleChangeGrp}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="button"
                      onClick={grpSubmitHandler}
                    >
                      Send
                    </Button>
                  </Form>{" "}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose2}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Interested categories</th>
                      <th>Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((row, index) => (
                      <tr>
                        {" "}
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>{row.student.interested_categories}</td>
                        <td>
                          <Button
                            as={Link}
                            to={`/show-assignment/${row.student.id}/${teacherId}`}
                            size="sm"
                            variant="warning"
                          >
                            Assignments
                          </Button>
                          <Button
                            className="ms-1"
                            as={Link}
                            to={`/add-assignment/${row.student.id}/${teacherId}/`}
                            variant="success"
                          >
                            Add Assignment
                          </Button>
                          <Button
                            className="ms-1"
                            size="sm"
                            title="Send Message"
                            onClick={handleShow}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faRocketchat} />
                          </Button>
                          {/* Message Modal */}
                          <Modal
                            fullscreen
                            scrollable
                            show={show}
                            onHide={handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                <span className="text-danger">
                                  {row.student.full_name}{" "}
                                </span>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Row>
                                <Col
                                  className="border-end"
                                  sm={8}
                                  style={msgList}
                                >
                                  <MessageList
                                    teacher_id={teacherId}
                                    student_id={row.student.id}
                                  />
                                </Col>
                                <Col sm={4}>
                                  {successMsg && (
                                    <p className="text-success">{successMsg}</p>
                                  )}
                                  {errorMsg && (
                                    <p className="text-danger">{errorMsg}</p>
                                  )}
                                  <Form>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="formBasicText"
                                    >
                                      <Form.Label>Message</Form.Label>
                                      <Form.Control
                                        value={msgData.msg_text}
                                        name="msg_text"
                                        as="textarea"
                                        type="text"
                                        rows="10"
                                        onChange={handleChange}
                                      />
                                    </Form.Group>

                                    <Button
                                      variant="primary"
                                      type="button"
                                      onClick={() =>
                                        submitHandler(row.student.id)
                                      }
                                    >
                                      Send
                                    </Button>
                                  </Form>
                                </Col>
                              </Row>{" "}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
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

export default UserList;
