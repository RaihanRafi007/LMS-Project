import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";
import Sidebar from "../../../components/user/Sidebar";

const UserStudyMaterials = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [studyData, setStudyData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(baseUrl + `user/study-materials/${course_id}`)
        .then((response) => {
          console.log(response.data);
          setStudyData(response.data);
          setTotalresult(response.data.length);
        });
    } catch (error) {
      console.log(error);
    }
    // setStudyData(data);
  }, [course_id]);

  const downloadFile = (file_url) => {
    window.location.href = file_url;
  };

  console.log(studyData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <Sidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>All Study Materials ({totalresult})</div>
                {/* <Button
                  variant="success"
                  as={Link}
                  to={`/add-study/${course_id}`}
                >
                  All Study Material
                </Button>{" "} */}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Detail</th>
                      <th>Upload</th>

                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyData.map((study, index) => (
                      <tr>
                        {" "}
                        <td> {study.title}</td>
                        <td> {study.description}</td>
                        <td>
                          {/* <Link to="/">{study.upload}</Link> */}
                          <Button size="sm" variant="outline-primary" onClick={() => downloadFile(study.upload)}>
                            Download File
                          </Button>
                        </td>
                        <td>{study.remarks}</td>
                      </tr>

                      // <option key={index} value={cat.id}>{cat.title}</option>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserStudyMaterials;
