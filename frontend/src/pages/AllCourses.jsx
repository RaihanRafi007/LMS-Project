import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Pagination,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Paginations from "../components/pagination/Pagination";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const AllCourses = () => {
  const baseUrl = "http://127.0.0.1:8000/api/course/";

  // const [apiUrl, setApiUrl] = useState(baseUrl);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetchData(baseUrl);
    // setCourseData(data);
  }, [baseUrl]);

  const paginationHandler = (url) => {
    fetchData(url);
  };
  function fetchData(url) {
    try {
      axios.get(url).then((res) => {
        // console.log(response.data);
        setPreviousUrl(res.data.previous);
        setNextUrl(res.data.next);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(courseData);
  // console.log(courseData.feature_img);
  return (
    <Layout>
      <Container>
        <Row>
          <h3 className="mb-4 mt-4">Latest Courses</h3>

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
        <Row>
          <Col className="mt-2 d-flex justify-content-center">
            {previousUrl && (
              <Pagination>
                {" "}
                {/* <Button
                type="button"
                size="sm"
                className="me-1"
                onClick={() => paginationHandler(previousUrl)}
              >
                <Pagination.Prev />
              </Button> */}
                <Pagination.Prev
                  className="me-1"
                  onClick={() => paginationHandler(previousUrl)}
                />
              </Pagination>
            )}

            {nextUrl && (
              <Pagination>
                <Pagination.Next onClick={() => paginationHandler(nextUrl)} />
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AllCourses;
