import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

const PromoBlog = ({ image, title, description, link }) => (
  <div className="container promoblog-container">
    <div
      className="promoblog-container"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}
    >
      <h1 className="promoblog-header">{title}</h1>
      <div className="promoblog-description">{description}</div>
      <Link to={link} className="promoblog-link">Read On</Link>
    </div>
  </div>
);

PromoBlog.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string
};

export default PromoBlog;
