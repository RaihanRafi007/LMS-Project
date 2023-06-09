import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Paginations from "../components/pagination/Pagination";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const Search = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [courseData, setCourseData] = useState([]);
  const { searchstring } = useParams();

  useEffect(() => {
    try {
      axios
        .get(baseUrl + "search-courses/" + searchstring)
        .then((response) => {
          // console.log(response.data);
          setCourseData(response.data.results);
        });
    } catch (error) {
      console.log(error);
    }
    // setCourseData(data);
  }, [searchstring]);

  console.log(courseData);
  // console.log(courseData.feature_img);
  return (
    <Layout>
      <Container>
        <Row>
          <h3 className="mb-4 mt-4">Searched for <span className="text-primary"> {searchstring} </span></h3>

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

          <Paginations />
        </Row>
      </Container>
    </Layout>
  );
};

export default Search;
