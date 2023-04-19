import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Swal from "sweetalert2";
import Layout from "../../../hocs/Layout";

const EditChapter = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const { chapter_id } = useParams();

  const [chapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setChapterData({
      ...chapterData,
      [e.target.name]: e.target.value,
    });
    console.log(chapterData);
  };
  // console.log(handleChange);

  const handleFileChange = (e) => {
    setChapterData({
      ...chapterData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("course", chapterData.course);
    formData.append("title", chapterData.title);
    formData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      formData.append("video", chapterData.video, chapterData.video.name);
    }
    formData.append("remarks", chapterData.remarks);

    try {
      axios
        .put(baseUrl + `chapter/${chapter_id}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Data has been updated!",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showCancelButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + `chapter/${chapter_id}`).then((response) => {
        console.log(response.data);
        setChapterData({
          course: response.data.course,
          title: response.data.title,
          description: response.data.description,
          prev_video: response.data.video,
          video: "",
          remarks: response.data.remarks,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [chapter_id]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="h4 text-center">
                Update Chapter
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={chapterData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      value={chapterData.description}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Description"
                      style={{ height: "100px" }}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextVideo"
                  >
                    <Form.Label column sm="2">
                      Video
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="video"
                        // value={chapterData.video}
                        onChange={handleFileChange}
                        type="file"
                      />
                      {chapterData.prev_video && (
                        <video controls height="240" width="250">
                          <source
                            src={chapterData.prev_video}
                            type="video/webm"
                          />
                        </video>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRemarks">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      name="remarks"
                      value={chapterData.remarks}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="This video is focused on basic introduction"
                      style={{ height: "100px" }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Php, JavaScript, Python, etc
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default EditChapter;
