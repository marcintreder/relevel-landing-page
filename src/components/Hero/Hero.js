import React from "react";
import PropTypes from "prop-types";

const Hero = ({ image, title, subheading }) => (
  <div className="hero-modified">
    <div className="container hero-container">
      <div
          className="hero-image"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
          }}
        ></div>
      <div className="column hero-text">
        <h1 className="hero-h1">{title}</h1>
        <h3 className="hero-h3">{subheading}</h3>
        <form className="hero-form">
          <input
            className="input-signup"
            type="text"
            placeholder="Your email address"
          />
          <input className="btn" type="submit" value="Get early access" />
        </form>
      </div>
    </div>
  </div>
);

Hero.propTypes = {
    image: PropTypes.object,
    title: PropTypes.string,
    subheading: PropTypes.string
}

export default Hero