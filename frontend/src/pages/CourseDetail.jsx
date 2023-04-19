import React, { useEffect, useState } from "react";
import axios from "axios";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Modal,
  Ratio,
  Badge,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const CourseDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const siteUrl = "http://127.0.0.1:8000/";

  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  let { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `course/${course_id}`).then((response) => {
        console.log(response.data);
        setChapterData(response.data.course_chapters);
        setCourseData(response.data);
        setTeacherData(response.data.teacher);
        setRelatedCourseData(JSON.parse(response.data.related_videos));
        setTechListData(response.data.tech_list);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [course_id]);
  // console.log(relatedCourseData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={4}>
            <Image
              width="240"
              src={courseData.feature_img}
              alt={courseData.title}
            />
          </Col>
          <Col sm={8}>
            <h3>{courseData.title}</h3>
            <p>{courseData.description}</p>
            <p className="fw-bold">
              Course By:{" "}
              <Link to={`/teacher-detail/${teacherData.id}`}>
                {" "}
                {teacherData.full_name}{" "}
              </Link>{" "}
            </p>
            <p className="fw-bold">Techs:&nbsp;
            {techListData &&
              techListData.map((tech, index) => (
                <Link to={`/category/${tech.trim()}`}>
                  <Badge bg="secondary">{tech.trim()}</Badge>
                </Link>
              ))}
            </p>
            
            
            <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>

            <p className="fw-bold">Total Enrolled: 456 students</p>

            <p className="fw-bold">Rating: 4.5/5</p>
          </Col>
        </Row>
        {/* Course Videos */}
        <Card>
          <Card.Header>
            {" "}
            <h4>In this course</h4>{" "}
          </Card.Header>
          <ListGroup>
            {chapterData &&
              chapterData.map((chapter, index) => (
                <ListGroup.Item>
                  {chapter.title}
                  <span className="float-end">
                    <span className="me-5">1 Hour 30 Minuits</span>
                    {/* <Modal>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                  </Modal.Footer>
                </Modal> */}
                    <Button
                      onClick={handleShow}
                      size="sm"
                      className="float-end"
                      variant="danger"
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </Button>{" "}
                  </span>
                  {/* Video Modal start */}
                  <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div style={{ width: 660, height: "auto" }}>
                        <Ratio aspectRatio="16x9">
                          <iframe
                            src={chapter.video}
                            title={chapter.title}
                            allowfullscreen
                          ></iframe>
                        </Ratio>
                      </div>{" "}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* Video Modal End */}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
        {/* Course Videos End*/}
        {/* Related Courses  */}
        <Row>
          <h4 className="mt-4">Related Courses</h4>
          {relatedCourseData &&
            relatedCourseData.map((rcourse, index) => (
              <Col className="d-flex">
                <Card className="mt-3" style={{ width: "18rem" }}>
                  <Link target="_blank" to={`/detail/${rcourse.pk}`}>
                    <Card.Img
                      variant="top"
                      alt={rcourse.fields.title}
                      src={`${siteUrl}media/${rcourse.fields.feature_img}`}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/detail/${rcourse.pk}`}>
                        {rcourse.fields.title}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        {/* Related Courses End */}
      </Container>
    </Layout>
  );
};

export default CourseDetail;
