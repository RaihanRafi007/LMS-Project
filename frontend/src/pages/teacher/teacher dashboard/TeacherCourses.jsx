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
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../../../app/course/courseApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";

const TeacherCourses = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [courseData, setCourseData] = useState([]);

  // const { data, isLoading, error } = useGetCoursesQuery();

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  useEffect(() => {
    try {
      axios.get(baseUrl + `teacher-courses/${teacherId}`).then((response) => {
        console.log(response.data);
        setCourseData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    // setcourseData(data);
  }, [teacherId]);

  console.log(courseData);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>My Courses</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Home</th>
                      <th>Image</th>
                      <th>Total Enrolled</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((course, index) => (
                      <tr>
                        {" "}
                        <td>
                          {" "}
                          <Link to={`/all-chapters/` + course.id}>
                            {course.title}
                          </Link>{" "}
                        </td>
                        <td>
                          <Image
                            src={course.feature_img}
                            alt={course.title}
                            width="80"
                            className="rounded"
                          />
                        </td>
                        <td>
                          123
                          {/* <Link to="#">{course.teacher.full_name}</Link> */}
                        </td>
                        <td>
                          <Button
                            as={Link}
                            to={`/edit-course/${course.id}`}
                            variant="info"
                          >
                            Edit
                          </Button>{" "}
                          <Button as={Link} to="" variant="danger">
                            Delete
                          </Button>{" "}
                          <Button as={Link} to={`/add-chapter/${course.id}`}>
                            Add Chapter
                          </Button>
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

export default TeacherCourses;
