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
import { useGetCoursesQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";

const EnrolledStudents = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [studentData, setStudentData] = useState([]);

  // const { data, isLoading, error } = useGetstudentsQuery();

  let { course_id } = useParams();
  console.log(course_id);

  useEffect(() => {
    try {
      axios
        .get(baseUrl + `fetch-enrolled-students/${course_id}`)
        .then((response) => {
          console.log(response.data);
          setStudentData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // setstudentData(data);
  }, [course_id]);

  // console.log(studentData);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Enrolled Student List</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Interested categories</th>
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

export default EnrolledStudents;
