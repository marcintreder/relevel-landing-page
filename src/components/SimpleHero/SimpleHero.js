import React from "react";
import PropTypes from "prop-types";

const SimpleHero = ({ image, title1, title2, description }) => (
  <div className="container">
    <div
      className="simple-hero-image"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}
    >
      <h1 className="simple-hero-header">{title1}<br />{title2}</h1>
      <span className="simple-hero-description">{description}</span>
    </div>
  </div>
);

SimpleHero.propTypes = {
  image: PropTypes.object,
  title1: PropTypes.string,
  title2: PropTypes.string,
  description: PropTypes.string
};

export default SimpleHero;
