import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input"
import Button from "../Button/Button"

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
          <Input type="text" kind="purple" placeholder="Your email address" />
          <Button label="Get early Access" kind="purple" />
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