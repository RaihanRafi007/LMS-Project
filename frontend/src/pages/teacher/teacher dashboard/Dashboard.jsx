import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";

const TeacherDashboard = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">Teacher Dashboard</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TeacherDashboard;
