import React from "react";
import PropTypes from "prop-types";

const ComingSoon = ({ image, title, description }) => (
  <section className="section">
    <div className="container comingsoon-container">
      <div className="comingsoon-text-container">
        <h2 className="comingsoon-header">{title}</h2>
        <div className="comingsoon-description">{description}</div>
        <form className="hero-form">
          <input
            className="input-signup"
            type="text"
            placeholder="Your email address"
          />
          <input className="btn" type="submit" value="Get early access" />
        </form>
      </div>
      <div
        className="comingsoon-image"
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
  title: PropTypes.string,
  description: PropTypes.string
};

export default ComingSoon;
