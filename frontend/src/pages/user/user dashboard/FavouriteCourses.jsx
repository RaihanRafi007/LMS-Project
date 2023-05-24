import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";

const FavourtieCourses = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [courseData, setCourseData] = useState([]);

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);
  // const { data, isLoading, error } = useGetcoursesQuery();

  // fatch courses when page is loaded
  useEffect(() => {
    try {
      axios
        .get(baseUrl + `fetch-favourite-courses/${studentId}`)
        .then((response) => {
          console.log(response.data);
          setCourseData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // setcourseData(data);
  }, [studentId]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Favourtie Courses</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((row, index) => (
                      <tr>
                        <td>
                          <Link to={`/detail/${row.course.id}`}>
                            {row.course.title}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/teacher-detail/${row.course.teacher.id}`}>
                            {row.course.teacher.full_name}
                          </Link>
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

export default FavourtieCourses;
