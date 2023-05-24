import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [notifData, setNotifData] = useState([]);

  const studentId = localStorage.getItem("studentId");
  console.log(studentId);

  // Fetch Courses
  useEffect(() => {
    try {
      axios
        .get(baseUrl + `student/fetch-all-notifications/${studentId}`)
        .then((response) => {
          console.log(response.data);
          setNotifData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  console.log(notifData);

  return (
    <Card style={{ width: "18rem" }}>
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="/student-dashboard">
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/my-courses">
          My Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/my-teachers">
          My Teachers
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/favourite-courses">
          Favourite Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/recommended-courses">
          Recommended Courses
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/my-assignments/">
          Assignments <Badge >{notifData.length}</Badge>
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/profile-setting">
          Profile Setting
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/change-password">
          Change Password
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/student-logout">
          Logout
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Sidebar;
