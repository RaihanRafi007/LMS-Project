import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Paginations from "../components/pagination/Pagination";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const PopularCourses = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <h3 className="mb-4 mt-4">Popular Courses</h3>

          <Col className="d-flex">
            <Card className="mt-3" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>
                  <Link to="/detail/1"> Course Title</Link>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <span>Rating: 4.5/5</span>
                    <span>Views: 4055</span>
                  </div>
                </Card.Footer>{" "}
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
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <span>Rating: 4.5/5</span>
                    <span>Views: 4055</span>
                  </div>
                </Card.Footer>{" "}
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
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <span>Rating: 4.5/5</span>
                    <span>Views: 4055</span>
                  </div>
                </Card.Footer>{" "}
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
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <span>Rating: 4.5/5</span>
                    <span>Views: 4055</span>
                  </div>
                </Card.Footer>{" "}
              </Card.Body>
            </Card>
          </Col>
          <Paginations />
        </Row>
      </Container>
    </Layout>
  );
};

export default PopularCourses;
