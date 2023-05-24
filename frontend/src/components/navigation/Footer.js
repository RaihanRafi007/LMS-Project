import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
// import { ThemeContext } from "../Themes/ThemeContext";
// import ThemeToggle from "../Themes/ThemeToggle";

const Footer = () => {
  // const { theme } = useContext(ThemeContext);
  var currentYear = new Date().getFullYear();

  const baseUrl = "http://127.0.0.1:8000/api/";

  const [pagesData, setPagesData] = useState([]);

  // let { pages_slug } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + `pages/`).then((response) => {
        console.log(response.data);
        setPagesData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    // setChapterData(data);
  }, []);

  return (
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <Link to="#" class="nav-link px-2 text-body-secondary">
            Home
          </Link>
        </li>
        {pagesData &&
          pagesData.map((row, index) => (
            <li class="nav-item">
              <Link
                to={`/page/${row.id}${row.url}`}
                class="nav-link px-2 text-body-secondary"
              >
                {row.title}
              </Link>
            </li>
          ))}
        {/* <li class="nav-item">
          <Link to="#" class="nav-link px-2 text-body-secondary">
            About Us
          </Link>
        </li> */}
        <li class="nav-item">
          <Link to="/contact-us" class="nav-link px-2 text-body-secondary">
            Contact Us
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/faq" class="nav-link px-2 text-body-secondary">
            FAQs
          </Link>
        </li>
        <li class="nav-item">
          <Link to="#" class="nav-link px-2 text-body-secondary">
            Support
          </Link>
        </li>
      </ul>
      <p class="text-center text-body-secondary">
        {" "}
        © {currentYear} LMS Company, Inc
      </p>
    </footer>
    // <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    //   <div class="col-md-4 d-flex align-items-center">
    //     <a
    //       href="/"
    //       class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
    //     >
    //       {/* <svg class="bi" width="30" height="24">
    //             <use xlink:href="#bootstrap"></use>
    //           </svg> */}
    //     </a>
    //     <span class="mb-3 mb-md-0 text-muted">
    //       LMS © {currentYear} Company, Inc
    //     </span>
    //   </div>

    //   <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
    //     <li class="ms-3">
    //       <a class="text-muted" href="#">
    //         <FontAwesomeIcon icon={faFacebook} />
    //       </a>
    //     </li>
    //     <li class="ms-3">
    //       <a class="text-muted" href="#">
    //         <FontAwesomeIcon icon={faTwitter} />
    //       </a>
    //     </li>
    //     <li class="ms-3">
    //       <a class="text-muted" href="#">
    //         <FontAwesomeIcon icon={faInstagram} />
    //       </a>
    //     </li>
    //   </ul>

    //   {/* <ThemeToggle /> */}

    //   {/* <div style={{ backgroundColor: theme.backgroundColor }}>
    //     <Button style={{ color: theme.textColor }}>Click me</Button>
    //   </div> */}
    // </footer>
  );
};

export default Footer;
