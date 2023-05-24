import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Figure,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [courseData, setCourseData] = useState([]);
  const [popularCourseData, setPopularCourseData] = useState([]);
  const [popularTeacherData, setPopularTeacherData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);

  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + "course/?result=4").then((response) => {
        // console.log(response.data);
        setCourseData(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
    // setCourseData(data);
    // Fetch popular teachers
    try {
      axios.get(baseUrl + "popular-teachers/?popular=4").then((response) => {
        // console.log(response.data);
        setPopularTeacherData(response.data);
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch popular Courses
    try {
      axios.get(baseUrl + "course/?popular=4").then((response) => {
        // console.log(response.data);
        setPopularCourseData(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch student Testimonial
    try {
      axios.get(baseUrl + "student-testimonial/").then((response) => {
        // console.log(response.data);
        setTestimonialData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log("Only Courses", courseData);
  console.log("Popular Courses", popularCourseData);

  return (
    <Layout>
      <Container>
        {/* Latest Courses  */}
        <Row>
          <div className="d-flex justify-content-between ">
            <h3 className="mb-4 mt-4">Latest Courses</h3>
            <Link className="btn btn-dark mb-4 mt-4" to="/all-courses">
              View ALl Courses <FontAwesomeIcon icon={faArrowRightLong} />{" "}
            </Link>
          </div>
          {courseData &&
            courseData.map((course, index) => (
              <Col className="d-flex">
                <Card className="mt-3" style={{ width: "18rem" }}>
                  {/* <Image src={course.feature_img} /> */}

                  <Link to={`/detail/${course.id}`}>
                    <Card.Img src={course.feature_img} alt={course.title} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/detail/${course.id}`}> {course.title}</Link>
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
        {/* Latest Courses End */}
        {/* Popolar Courses  */}
        <Row>
          <div className="d-flex justify-content-between ">
            <h3 className="mb-4 mt-4">Popular Courses</h3>
            <Link className="btn btn-dark mb-4 mt-4" to="/popular-courses">
              View ALl Courses <FontAwesomeIcon icon={faArrowRightLong} />{" "}
            </Link>
          </div>
          {popularCourseData &&
            popularCourseData.map((course, index) => (
              <Col className="d-flex">
                <Card className="mt-3" style={{ width: "18rem" }}>
                  {/* <Image src={course.feature_img} /> */}

                  <Link to={`/detail/${course.id}`}>
                    <Card.Img src={course.feature_img} alt={course.title} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/detail/${course.id}`}> {course.title}</Link>
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
        {/* Popular Courses End */}

        {/* Popolar Teachers  */}
        <Row>
          <div className="d-flex justify-content-between ">
            <h3 className="mb-4 mt-4">Popular Teachers</h3>
            <Link className="btn btn-dark mb-4 mt-4" to="/popular-teachers">
              View ALl Teachers <FontAwesomeIcon icon={faArrowRightLong} />{" "}
            </Link>
          </div>
          {popularTeacherData &&
            popularTeacherData.map((teacher, index) => (
              <Col className="d-flex">
                <Card className="mt-3" style={{ width: "18rem" }}>
                  {/* <Image src={teacher.feature_img} /> */}

                  <Link to={`/teacher-detail/${teacher.id}`}>
                    <Card.Img
                      src={teacher.profile_img}
                      alt={teacher.full_name}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/teacher-detail/${teacher.id}`}>
                        {" "}
                        {teacher.full_name}
                      </Link>
                    </Card.Title>

                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                  <Card.Footer>
                    Total Courses: {teacher.total_teacher_courses}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
        {/* Popular Teachers End */}

        {/* Student Testimonial  */}
        <Row>
          <h4 className="mt-4">Student Testimonial</h4>
          <Carousel className={"mt-4 text-white mb-4 p-5 bg-dark"}>
            {testimonialData &&
              testimonialData.map((row, index) => (
                <Carousel.Item bg="secondary" className="text-center">
                  <Figure>
                    <blockquote className="blockquote">
                      <p>{row.reviews} </p>
                    </blockquote>
                    <Figure.Caption className="blockquote-footer">
                      {row.course.title}
                      <cite title="Source Title">
                        {row.student.full_name}
                      </cite>{" "}
                    </Figure.Caption>
                  </Figure>
                </Carousel.Item>
              ))}
          </Carousel>
        </Row>
        {/* Student Testimonial End */}
      </Container>
    </Layout>
  );
};

export default Home;
