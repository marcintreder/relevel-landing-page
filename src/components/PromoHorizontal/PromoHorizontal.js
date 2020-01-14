import React from "react";
import PropTypes from "prop-types";

const PromoHorizontal = ({ image, title, text }) => (
  <section className="section">
    <div className="container promohorizontal-container">
      <div
        className="promohorizontal-image"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        }}
      ></div>
      <div className="promohorizontal-text-container">
        <h2 className="promohorizontal-header">{title}</h2>
        <span className="promohorizontal-text">{text}</span>
      </div>
    </div>
  </section>
);

PromoHorizontal.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string, 
  text: PropTypes.string
};

export default PromoHorizontal;
