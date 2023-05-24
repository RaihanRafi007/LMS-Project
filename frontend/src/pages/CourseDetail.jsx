import React, { useEffect, useState } from "react";
import axios from "axios";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
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
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";
import Swal from "sweetalert2";

const CourseDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const siteUrl = "http://127.0.0.1:8000/";

  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [userLoginStatus, setUserLoginStatus] = useState();
  const [enrollStatus, setEnrollStatus] = useState();
  const [ratingStatus, setRatingStatus] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [favouritestatus, setFavouriteStatus] = useState();
  const [courseView, setCourseView] = useState(0);

  let { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + `course/${course_id}`).then((response) => {
        console.log(response.data);
        setChapterData(response.data.course_chapters);
        setCourseData(response.data);
        setTeacherData(response.data.teacher);
        setRelatedCourseData(JSON.parse(response.data.related_videos));
        setTechListData(response.data.tech_list);
        if (
          response.data.course_rating !== "" &&
          response.data.course_rating !== null
        ) {
          setAvgRating(response.data.course_rating);
        }
      });

      // update View
      axios.get(baseUrl + `update-view/${course_id}`).then((res) => {
        // console.log(res);
        setCourseView(res.data.views);
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch Enroll Status
    try {
      axios
        .get(baseUrl + `fetch-enroll-status/${studentId}/${course_id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.bool === true) {
            setEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch Rating Status
    try {
      axios
        .get(baseUrl + `fetch-rating-status/${studentId}/${course_id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.bool === true) {
            setRatingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch Favourite Status
    try {
      axios
        .get(baseUrl + `fetch-favourite-status/${studentId}/${course_id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.bool === true) {
            setFavouriteStatus("success");
          } else {
            setFavouriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setUserLoginStatus("success");
    }
  }, [course_id, studentId]);
  // console.log(relatedCourseData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const enrollCourse = () => {
    const studentId = localStorage.getItem("studentId");

    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);

    try {
      axios
        .post(baseUrl + "student-enroll-course/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          // window.location.href='/add-course'
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "You have successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Add Rating
  const [ratingData, setRatingData] = useState({
    rating: "",
    reviews: "",
  });
  const [videoDuration, setVideoDuration] = useState();

  const handleChange = (e) => {
    setRatingData({
      ...ratingData,
      [e.target.name]: e.target.value,
    });
    console.log(ratingData);
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);
    formData.append("rating", ratingData.rating);
    formData.append("reviews", ratingData.reviews);

    try {
      axios.post(baseUrl + "course-rating/", formData, {}).then((response) => {
        // console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Rating has been added.",
            icon: "success",
            toast: true,
            timer: 1000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markAsFavourite = () => {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);
    formData.append("status", true);

    try {
      axios
        .post(baseUrl + "student-add-favourite-course/", formData)
        .then((response) => {
          console.log(response);

          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "This course has been added in your wishlist.",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          setFavouriteStatus("success");
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove from favourite course
  const removeFavourite = (pk) => {
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);
    formData.append("status", false);

    try {
      axios
        .get(
          baseUrl + `student-remove-favourite-course/${course_id}/${studentId}`,
          formData
        )
        .then((response) => {
          console.log(response);

          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "This course has been removed in your wishlist.",
              icon: "success",
              toast: true,
              timer: 1000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          setFavouriteStatus("");
        });
    } catch (error) {
      console.log(error);
    }
  };

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
            <p className="fw-bold">
              Techs:&nbsp;
              {techListData &&
                techListData.map((tech, index) => (
                  <Link to={`/category/${tech.trim()}`}>
                    <Badge bg="secondary">{tech.trim()}</Badge>
                  </Link>
                ))}
            </p>

            <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>

            <p className="fw-bold">
              Total Enrolled: {courseData.total_enrolled_students} student(s)
            </p>
            <p className="fw-bold">Views: {courseView}</p>

            <p className="fw-bold">
              Rating: {avgRating}/5{" "}
              {enrollStatus === "success" && userLoginStatus === "success" && (
                <>
                  {ratingStatus !== "success" ? (
                    <>
                      <Button size="sm" variant="success" onClick={handleShow}>
                        Rating
                      </Button>
                    </>
                  ) : (
                    <Badge bg="info" text="dark">
                      You already rated this course
                    </Badge>
                  )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Rate for {courseData.title} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                          <Form.Label>Rating</Form.Label>
                          <Form.Select onChange={handleChange} name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicReview"
                        >
                          <Form.Label>Review</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            as="textarea"
                            name="reviews"
                            rows="8"
                            placeholder="Please write your review."
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>{" "}
                    </Modal.Body>
                    {/* <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer> */}
                  </Modal>{" "}
                </>
              )}{" "}
            </p>
            {enrollStatus === "success" && userLoginStatus === "success" && (
              <p>
                <span>You are already enrolled in this course.</span>
              </p>
            )}
            {userLoginStatus === "success" && enrollStatus !== "success" && (
              <p>
                {" "}
                <Button onClick={enrollCourse} as={Link} to="/">
                  Enroll in this course
                </Button>{" "}
              </p>
            )}
            {userLoginStatus === "success" && favouritestatus !== "success" && (
              <p>
                {" "}
                <Button
                  onClick={markAsFavourite}
                  title="Add in your favourite course list"
                  size="sm"
                  variant="outline-danger"
                >
                  <FontAwesomeIcon icon={faHeart} />{" "}
                </Button>{" "}
              </p>
            )}
            {userLoginStatus === "success" && favouritestatus === "success" && (
              <p>
                {" "}
                <Button
                  onClick={removeFavourite}
                  title="Remove from your favourite course list"
                  size="sm"
                  variant="danger"
                >
                  <FontAwesomeIcon icon={faHeart} />{" "}
                </Button>{" "}
              </p>
            )}
            {userLoginStatus !== "success" && (
              <p>
                <Link to="/student-login">
                  Please login to enroll in this course.
                </Link>
              </p>
            )}
          </Col>
        </Row>
        {/* Course Videos */}
        {enrollStatus === "success" && userLoginStatus === "success" && (
          <Card>
            <Card.Header>
              {" "}
              <h4>In this course s by</h4>{" "}
            </Card.Header>
            <ListGroup>
              {chapterData &&
                chapterData.map((chapter, index) => (
                  <ListGroup.Item key={chapter.id}>
                    introduction srba
                    {chapter.title}
                    <span className="float-end">
                      <span className="me-5">{chapter.chapter_duration}</span>
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
        )}
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
