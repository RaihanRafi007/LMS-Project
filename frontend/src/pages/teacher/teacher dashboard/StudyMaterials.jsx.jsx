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
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Layout from "../../../hocs/Layout";
import Swal from "sweetalert2";

const StudyMaterials = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [studyData, setStudyData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `study-materials/${course_id}`).then((response) => {
        console.log(response.data);
        setStudyData(response.data);
        setTotalresult(response.data.length);
      });
    } catch (error) {
      console.log(error);
    }
    // setStudyData(data);
  }, [course_id]);

  // to={`/delete-study/` + study.id}

  // const Swal = require("sweetalert2");
  const handleDelete = (study_id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Do you want to delete this?",
      icon: "warning",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(baseUrl + `study-material/${study_id}`)
            .then((response) => {
              Swal.fire("success", "Data has been deleted.");
              try {
                axios
                  .get(baseUrl + `study-materials/${course_id}`)
                  .then((response) => {
                    console.log(response.data);
                    setStudyData(response.data);
                    setTotalresult(response.data.length);
                  });
              } catch (error) {
                console.log(error);
              }
            });
        } catch (error) {
          Swal.fire("error", "Data has not been deleted.");
        }
      } else {
        Swal.fire("error", "Data has not been deleted.");
      }
    });
  };

  console.log(studyData);

  const downloadFile = (file_url) => {
    window.location.href = file_url;
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>All Study Materials ({totalresult})</div>
                <Button
                  variant="success"
                  as={Link}
                  to={`/add-study/${course_id}`}
                >
                  All Study Material
                </Button>{" "}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Upload</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyData.map((study, index) => (
                      <tr>
                        {" "}
                        <td> {study.title}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => downloadFile(study.upload)}
                          >
                            Download File
                          </Button>{" "}
                        </td>
                        <td>{study.remarks}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(study.id)}
                          >
                            Delete
                          </Button>{" "}
                          {/* <Button as={Link} to={`/edit-study/${study.id}`}>
                            Edit
                          </Button> */}
                        </td>
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

export default StudyMaterials;
