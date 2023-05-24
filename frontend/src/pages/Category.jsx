import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Paginations from "../components/pagination/Pagination";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const Category = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [categoryData, setCategoryData] = useState([]);

  // let { category_slug } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `category/`).then((response) => {
        console.log(response.data);
        setCategoryData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <h3 className="mb-4 mt-4">All Categories</h3>

          {categoryData &&
            categoryData.map((row, index) => (
              <Col className="d-flex">
                <Card className="mt-3" style={{ width: "18rem" }}>
                  {/* <Image src={row.feature_img} /> */}

                  {/* <Link to={`/detail/${row.id}`}>
                    <Card.Img src={row.feature_img} alt={row.title} />
                  </Link> */}
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/course/${row.id}/${row.title}`}>
                        {" "}
                        {row.title} ({row.total_courses})
                      </Link>
                    </Card.Title>
                    <Card.Text>{row.description}</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Col>
            ))}

          {/* <Paginations /> */}
        </Row>
      </Container>
    </Layout>
  );
};

export default Category;
