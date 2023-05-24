import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";
import Swal from "sweetalert2";

const StudentAssignments = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignment_status, setAssignment_status] = useState("");

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);
  // const { data, isLoading, error } = useGetcoursesQuery();

  // fatch courses when page is loaded
  useEffect(() => {
    try {
      axios.get(baseUrl + `my-assignment/${studentId}`).then((response) => {
        console.log(response.data);
        setAssignmentData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  const markAsDone = (assignment_id, title, detail, student, teacher) => {
    const formData = new FormData();
    formData.append("student_status", true);
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("student", student);
    formData.append("teacher", teacher);

    try {
      axios
        .put(baseUrl + `update-assignment/${assignment_id}`, formData)
        .then((response) => {
          console.log(response.data);
          // window.location.href='/add-course'
          if (response.status === 200 || response.status === 201) {
            // Swal.fire({
            //   title: "You have successfully completed this assignment.",
            //   icon: "success",
            //   toast: true,
            //   timer: 1000,
            //   position: "top-right",
            //   timerProgressBar: true,
            //   showConfirmButton: false,
            // });
            // setAssignment_status("success");
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
console.log(assignmentData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>My Assignments</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Details</th>
                      <th>Teacher</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((row, index) => (
                      <tr>
                        <td>{row.title}</td>
                        <td>{row.detail}</td>
                        <td>
                          <Link to={`/teacher-detail/${row.teacher.id}`}>
                            {row.teacher.full_name}
                          </Link>
                        </td>
                        <td>
                          {row.student_status === false ? (
                            <Button
                              onClick={() =>
                                markAsDone(
                                  row.id,
                                  row.title,
                                  row.detail,
                                  row.student.id,
                                  row.teacher.id
                                )
                              }
                              size="sm"
                              variant="success"
                            >
                              Mark as Done
                            </Button>
                          ) : (
                            <span>
                              <Badge size="sm">Completed</Badge>
                            </span>
                          )}
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

export default StudentAssignments;
