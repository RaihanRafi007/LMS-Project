import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../hocs/Layout";

const Login = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={6} className="offset-3">
            <Card bg="light">
              <Card.Header align="center" as="h5">
                Login
              </Card.Header>
              <Card.Body>
                {/* {formError && <p className="text-danger">{errorMsg}</p>} */}

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name="username"
                      // value={loginFormData.username}
                      // onChange={inputHandler}
                      type="text"
                      placeholder="Enter your Username"
                      required
                    />
                    {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      // value={loginFormData.password}
                      // onChange={inputHandler}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
                  <Button
                    //   disabled={!loginFormData.username || !loginFormData.password}
                    variant="primary"
                    type="button"
                    //   onClick={submitHandler}
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
