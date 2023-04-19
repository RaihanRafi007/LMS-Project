import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import TeacherSidebar from "../../../components/teacher/Sidebar";

import Layout from "../../../hocs/Layout";

const TeacherChangePassword = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Change Password</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      New Password
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="password" placeholder="Password" />
                    </Col>
                  </Form.Group>
                </Form>
                <Button> Update</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TeacherChangePassword;
