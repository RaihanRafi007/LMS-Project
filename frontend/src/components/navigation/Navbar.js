import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  const [searchString, setSearchString] = useState({
    search: "",
  });

  const handleChange = (e) => {
    setSearchString({
      ...searchString,
      [e.target.name]: e.target.value,
    });
    console.log(searchString);
  };

  const searchCourse = () => {
    if (searchString.search !== "") {
      window.location.href = "/search/" + searchString.search;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Learn Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
            <Form className="d-flex">
              <Form.Control
                onChange={handleChange}
                name="search"
                size="sm"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button
                onClick={searchCourse}
                type="button"
                size="sm"
                variant="outline-success"
              >
                Search
              </Button>
            </Form>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/category">
              Categories
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
              {studentLoginStatus !== "true" ? (
                <>
                  {" "}
                  <NavDropdown.Item as={Link} to="/student-login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user-register">
                    Registration
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/student-dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student-logout">
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
