import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../hocs/Layout";
import { Container } from "react-bootstrap";

const Page = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [pagesData, setPagesData] = useState([]);

  let { page_id, page_slug } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `pages/${page_id}/${page_slug}/`).then((response) => {
        console.log(response.data);
        setPagesData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, [page_id, page_slug]);
  return (
    <Layout>
      <Container>
        <h2>{pagesData.title} </h2>
        <p>{pagesData.content}</p>
      </Container>
    </Layout>
  );
};

export default Page;
