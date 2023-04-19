import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Learn Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/all-courses">
              Courses
            </Nav.Link>
            <NavDropdown title="Teacher" id="basic-nav-dropdown">
              {teacherLoginStatus !== "true" ? (
                <>
                  {" "}
                  <NavDropdown.Item as={Link} to="/teacher-login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/teacher-register">
                    Registration
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/teacher-dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/teacher-logout">
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            {/* <Nav.Link as={Link} to="/about">About Us</Nav.Link> */}

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user-login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-register">
                Registration
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/user-dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-login">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
