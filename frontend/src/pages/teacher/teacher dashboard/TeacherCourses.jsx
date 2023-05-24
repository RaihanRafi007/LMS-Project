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
          <Col className="mb-2" md="3">
            <TeacherSidebar />
          </Col>
          <Col  md="9">
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
                          <hr />
                          {course.course_rating ? (
                            <span>Rating: {course.course_rating}/5 </span>
                          ) : (
                            <span>Rating: 0/5</span>
                          )}
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
                          <Link to={`/enrolled-students/${course.id}`}>
                            {" "}
                            {course.total_enrolled_students}
                          </Link>
                        </td>
                        <td>
                          <Button
                            as={Link}
                            to={`/edit-course/${course.id}`}
                            variant="warning"
                            className="mt-1 ms-1"
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            as={Link}
                            to={`/study-materials/${course.id}`}
                            variant="info"
                            className="mt-1 ms-1"
                          >
                           Study Material
                          </Button>{" "}
                          <Button className="mt-1 ms-1"  size="sm" as={Link} to="" variant="danger">
                            Delete
                          </Button>{" "}
                          <Button className="mt-1 ms-1" size="sm" as={Link} to={`/add-chapter/${course.id}`}>
                            Add Chapter
                          </Button>
                          <Button className="mt-1 ms-1" variant="success" size="sm" as={Link} to={`/assign-quiz/${course.id}`}>
                            Assign Quiz
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
