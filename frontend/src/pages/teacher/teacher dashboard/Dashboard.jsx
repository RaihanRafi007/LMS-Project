import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [dashboardData, setDashboardData] = useState([]);

  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  // Fetch Courses
  useEffect(() => {
    try {
      axios.get(baseUrl + `teacher/dashboard/${teacherId}`).then((response) => {
        // console.log(response.data);
        setDashboardData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [teacherId]);

  return (
    <Layout>
      <Container className="mt-4 ">
        <Row>
          <Col>
            <TeacherSidebar />
          </Col>
          <Col>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="text-white bg-primary">
                    Total Courses
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/teacher-courses">
                        {dashboardData.total_teacher_courses}
                      </Link>
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="text-white bg-success">
                    Total Students
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/teacher-users">
                        {dashboardData.total_teacher_students}
                      </Link>
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="text-white bg-info">
                    Total Chapters
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/teacher-courses">
                        {dashboardData.total_teacher_chapters}
                      </Link>
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TeacherDashboard;
