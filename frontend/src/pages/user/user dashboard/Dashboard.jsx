import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MyCourses from "./MyCourses";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">Dashboard</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
