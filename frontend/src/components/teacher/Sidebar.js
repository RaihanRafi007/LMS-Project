import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="/teacher-dashboard">
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/teacher-courses">
          My Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/add-courses">
          Add Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/teacher-users">
          My User
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/quiz">
          Quiz
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/add-quiz">
          Add Quiz
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/teacher-profile-setting">
          Profile Setting
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/teacher-change-password">
          Change Password
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/teacher-login">
          Logout
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default TeacherSidebar;
