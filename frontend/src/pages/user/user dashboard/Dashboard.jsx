import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Layout from "../../../hocs/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";

const Dashboard = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [dashboardData, setDashboardData] = useState([]);

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);

  // Fetch Courses
  useEffect(() => {
    try {
      axios.get(baseUrl + `student/dashboard/${studentId}`).then((response) => {
        // console.log(response.data);
        setDashboardData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  console.log(dashboardData);
  return (
    <Layout>
      <Container className="mt-4 ">
        <Row>
          <Col md="4">
            <Sidebar />
          </Col>
          <Col md="8">
            <Row>
              <Col md="4">
                <Card>
                  <Card.Header className="text-white bg-primary">
                    Enrolled Courses
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/my-courses">
                        {dashboardData.enrolled_courses}
                      </Link>
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <Card.Header className="text-white bg-success">
                    Favourite Courses
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/favourite-courses">
                        {dashboardData.favourite_courses}
                      </Link>
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <Card.Header className="text-white bg-info">
                    Assignments
                  </Card.Header>
                  <Card.Body bg="primary">
                    <h3>
                      <Link to="/my-assignments">
                        Completed: {dashboardData.complete_assignments},
                        Pending: {dashboardData.pending_assignments}
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

export default Dashboard;
