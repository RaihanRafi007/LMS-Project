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
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";

const UserList = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Users List</Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Home</th>
                      <th>Created By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Php Development</td>
                      <td>
                        <Link to="#">Rafi</Link>
                      </td>
                      <td>
                        <Button variant="danger">Delete</Button>{" "}
                      </td>
                    </tr>
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

export default UserList;
