import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/category/categoryApi";
import TeacherSidebar from "../../../components/teacher/Sidebar";
import Swal from "sweetalert2";
import Layout from "../../../hocs/Layout";

const EditCourse = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [cats, setCats] = useState([]);

  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    prev_img: "",
    f_img: "",
    techs: "",
  });

  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();
  const { course_id } = useParams();
  // Fetch categories when page load
  useEffect(() => {
    setCats(categories);

    try {
      axios
        .get(baseUrl + `teacher-course-detail/${course_id}`)
        .then((response) => {
          console.log(response.data);
          setCourseData({
            category: response.data.category,
            title: response.data.title,
            description: response.data.description,
            prev_img: response.data.feature_img,
            f_img: "",
            techs: response.data.techs,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, [cats, categories, course_id]);
  console.log(cats);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
    console.log(courseData);
  };
  // console.log(handleChange);

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("category", courseData.category);
    formData.append("teacher", 1);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    if (courseData.f_img !== "") {
      formData.append("feature_img", courseData.f_img, courseData.f_img.name);
    }
    formData.append("techs", courseData.techs);

    try {
      axios
        .put(baseUrl + `teacher-course-detail/${course_id}`, formData, {
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

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="mb-2" md="5">
            <TeacherSidebar />
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>Edit Course</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Select
                    value={courseData.category}
                    onChange={handleChange}
                    name="category"
                    // className="form-control"
                    aria-label="Default select example"
                  >
                    <option>Open this select menu</option>
                    {cats.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={courseData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Title"
                      id="title"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      value={courseData.description}
                      onChange={handleChange}
                      as="textarea"
                      placeholder="Description"
                      style={{ height: "100px" }}
                      id="description"
                    />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextFeatureImage"
                  >
                    <Form.Label column sm="2">
                      Feature Image
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        // value={courseData.f_img}
                        onChange={handleFileChange}
                        name="f_img"
                        id="f_img"
                        type="file"
                      />
                      {courseData.prev_img && (
                        <Image src={courseData.prev_img} width="300" />
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicTechnologies"
                  >
                    <Form.Label>Technologies</Form.Label>
                    <Form.Control
                      value={courseData.techs}
                      onChange={handleChange}
                      name="techs"
                      as="textarea"
                      placeholder="Technologies"
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

export default EditCourse;
