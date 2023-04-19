import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../../components/user/Sidebar";
import Layout from "../../../hocs/Layout";

const ProfileSetting = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Profile Setting</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="full_name"
                      // value={registerFormData.full_name}
                      // onChange={inputHandler}
                      type="text"
                      placeholder="Full Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue="email@example.com"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextProfilePhoto"
                  >
                    <Form.Label column sm="2">
                      Profile Photo
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="file" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicInterests">
                    <Form.Label>Interests</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Interests"
                      style={{ height: "100px" }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Php, JavaScript, Python, etc
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      Password
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

export default ProfileSetting;
