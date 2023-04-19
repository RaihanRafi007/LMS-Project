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

const CourseChapter = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const [chapterData, setChapterData] = useState([]);
  const [totalresult, setTotalresult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `course-chapters/${course_id}`).then((response) => {
        console.log(response.data);
        setChapterData(response.data);
        setTotalresult(response.data.length);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [course_id]);

  // to={`/delete-chapter/` + chapter.id}

  // const Swal = require("sweetalert2");
  const handleDelete = (chapter_id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Do you want to delete this?",
      icon: "warning",
      confirmButtonText: "Continue",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + `chapter/${chapter_id}`).then((response) => {
            Swal.fire("success", "Data has been deleted.");
            try {
              axios
                .get(baseUrl + `course-chapters/${course_id}`)
                .then((response) => {
                  console.log(response.data);
                  setChapterData(response.data);
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

  console.log(chapterData);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="d-flex justify-content-between" >
                <div>All Chapter {totalresult}</div>
                <Button
                  variant="success"
                  as={Link}
                  to={`/add-chapter/${course_id}`}
                >
                  Add Chapter
                </Button>{" "}
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapterData.map((chapter, index) => (
                      <tr>
                        {" "}
                        <td>
                          {" "}
                          <Link to={`/all-chapters/` + chapter.id}>
                            {chapter.title}
                          </Link>{" "}
                        </td>
                        <td>
                          <video controls width="250">
                            <source
                              src={
                                chapter.video
                                  ? chapter.video.url
                                  : chapter.title
                              }
                              type="video/webm"
                            ></source>
                          </video>
                        </td>
                        <td>
                          <Link>{chapter.remarks}</Link>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(chapter.id)}
                          >
                            Delete
                          </Button>{" "}
                          <Button as={Link} to={`/edit-chapter/${chapter.id}`}>
                            Edit
                          </Button>
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

export default CourseChapter;
