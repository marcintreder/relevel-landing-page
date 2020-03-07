import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button"
import Input from "../Input/Input"

const ComingSoon = ({ image, title, description, imageAlt, imageTitle, ...props }) => (
  <section className="section">
    <div className="container comingsoon-container">
      <div className="comingsoon-text-container">
        <h2 className="comingsoon-header">{title}</h2>
        <div className="comingsoon-description">{description}</div>
        <form className="comingsoon-form">
          <Input
            type="text"
            placeholder="Your email address"
            kind="purple"
          />
          <Button kind="purple" label="Get early access" />
        </form>
      </div>
      <div
        className="comingsoon-image"
        role="img"
        aria-label={imageAlt}
        alt={imageAlt}
        title={imageTitle}
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp
              ? image.childImageSharp.fluid.src
              : image
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
    </div>
  </section>
);

ComingSoon.propTypes = {
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ComingSoon;
