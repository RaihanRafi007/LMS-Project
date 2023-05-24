import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Paginations from "../components/pagination/Pagination";
import Layout from "../hocs/Layout";
import logo from "../logo.svg";

const FAQ = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [faqData, setFaqData] = useState([]);

  // let { faq_slug } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `faq/`).then((response) => {
        console.log(response.data);
        setFaqData(response.data);
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
          <h3 className="mb-4 mt-4">FAQs</h3>
          {faqData.map((row, index) => (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{row.question}</Accordion.Header>
                <Accordion.Body>
                {row.answer}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}

          {/* <Paginations /> */}
        </Row>
      </Container>
    </Layout>
  );
};

export default FAQ;

