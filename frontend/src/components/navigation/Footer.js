import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";
// import { ThemeContext } from "../Themes/ThemeContext";
// import ThemeToggle from "../Themes/ThemeToggle";

const Footer = () => {
  // const { theme } = useContext(ThemeContext);
  var currentYear = new Date().getFullYear();

  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a
          href="/"
          class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          {/* <svg class="bi" width="30" height="24">
                <use xlink:href="#bootstrap"></use>
              </svg> */}
        </a>
        <span class="mb-3 mb-md-0 text-muted">
          LMS © {currentYear} Company, Inc
        </span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-muted" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
      </ul>

      {/* <ThemeToggle /> */}

      {/* <div style={{ backgroundColor: theme.backgroundColor }}>
        <Button style={{ color: theme.textColor }}>Click me</Button>
      </div> */}
    </footer>
  );
};

export default Footer;
