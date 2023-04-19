import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Layout from "../../hocs/Layout";

const Registration = () => {
  return (
    <Layout>
      <Container>
        <Card bg="light">
          <Card.Header align="center" as="h5">
            Register
          </Card.Header>
          {/* {successMsg && <p className="text-success">{successMsg}</p>}
        {errorMsg && <p className="text-danger"> {errorMsg} </p>} */}
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

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  // value={registerFormData.username}
                  // onChange={inputHandler}
                  type="text"
                  placeholder="Username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  // value={registerFormData.email}
                  // onChange={inputHandler}
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mobile"
                // value={registerFormData.mobile}
                // onChange={inputHandler}
                // type="number"
                placeholder="mobile"
                required
              />
            </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  // value={registerFormData.password}
                  // onChange={inputHandler}
                  type="password"
                  placeholder="Password"
                  required
                />
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

              <Button
                variant="primary"
                type="button"
                // onClick={submitHandler}
                // disabled={disabled}
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Registration;
