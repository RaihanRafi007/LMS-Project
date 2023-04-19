import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import logo from "../../logo.svg";

const TeacherDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [skillList, setSkillList] = useState([]);
  let { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `teacher/${teacher_id}`).then((response) => {
        console.log(response.data);
        setCourseData(response.data.teacher_courses);
        setTeacherData(response.data);
        setSkillList(response.data.skill_list);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [teacher_id]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={4}>
            <Image src={logo} />
          </Col>
          <Col sm={8}>
            <h3>{teacherData.full_name}</h3>
            <p>{teacherData.detail}</p>
            <p className="fw-bold">
              Skills: &nbsp;
              {skillList &&
                skillList.map((skill, index) => (
                  <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}>
                    <Badge bg="secondary">{skill.trim()}</Badge>
                  </Link>
                ))}
            </p>
            <p className="fw-bold">
              Recent Course: <Link to="/teacher-detail/1">ReactJs Course</Link>
            </p>
            <p className="fw-bold">Rating: 4.5/5</p>
          </Col>
        </Row>
        {/* Course Videos */}
        <Card>
          <Card.Header>
            {" "}
            <h4>Course List</h4>{" "}
          </Card.Header>
          <ListGroup>
            {courseData &&
              courseData.map((course, index) => (
                <ListGroup.Item>
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
        {/* Course Videos End*/}
        {/* Related Courses  */}
        {/* <Row>
        <h4 className="mt-4">Related Courses</h4>

        <Col className="d-flex">
          <Card className="mt-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>
                <Link to="detail/1"> Course Title</Link>
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card className="mt-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Course Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card className="mt-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Course Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card className="mt-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title>Course Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
        {/* Related Courses End */}
      </Container>
    </Layout>
  );
};

export default TeacherDetail;
