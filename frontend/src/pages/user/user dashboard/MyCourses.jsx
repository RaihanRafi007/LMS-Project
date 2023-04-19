import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";

const MyCourses = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>My Courses</Card.Header>
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

export default MyCourses;
