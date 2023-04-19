import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <ListGroup variant="flush">
      <ListGroup.Item as={Link} to="/user-dashboard" >
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/my-courses" >
          My Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/favourite-courses">
          Favourite Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/recommended-courses">
          Recommended Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/profile-setting">
          Profile Setting
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/change-password">
          Change Password
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/user-login">
          Logout
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Sidebar;
