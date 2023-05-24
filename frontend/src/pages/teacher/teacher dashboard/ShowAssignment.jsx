import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
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

const ShowAssignment = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [assignmentData, setAssignmentData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);
  const { teacher_id } = useParams();
  const { s_id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(baseUrl + `student-assignment/${teacher_id}/${s_id}`)
        .then((response) => {
          console.log(response.data);
          setAssignmentData(response.data);
          setTotalresult(response.data.length);
        });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [s_id, teacher_id]);

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
                <div>All Assignments {totalresult}</div>
                <Button
                  variant="success"
                  as={Link}
                  to={`/add-assignment/${s_id}/${teacher_id}`}
                >
                  Add Assignment
                </Button>{" "}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Assignment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((ass, index) => (
                      <tr>
                        {" "}
                        <td>
                          {" "}
                          <Link to={`/all-assignments/` + ass.id}>
                            {ass.title}
                          </Link>{" "}
                        </td>
                        <td>
                          {ass.student_status === false ? (
                            <span>
                              <Badge size="sm">Pending</Badge>
                            </span>
                          ) : (
                            <span>
                              <Badge size="sm">Completed</Badge>
                            </span>
                          )}
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

export default ShowAssignment;
