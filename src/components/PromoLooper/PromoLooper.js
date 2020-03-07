import React from "react";
import PropTypes from "prop-types";
import TextLoop from "react-text-loop";

const PromoLooper = ({ image, imageTitle, imageAlt, title, add }) => (
  <section className="section">
    <div className="container prosection-container">
      <div
        className="prosection-image"
        role="img"
        aria-label={imageAlt}
        title={imageTitle}
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp
              ? image.childImageSharp.fluid.src
              : image
          })`,
        }}
      ></div>
      <h2 className="prosection-header">
        {title + " "}
        <span aria-label={add.map(item => item.pain).toString()}></span>
        <TextLoop interval={6000} delay={2000} mask aria-hidden="true">
          {add.map((item, i) => (
            <span className="prosection-paindadd" key={`pain` + i} aria-hidden="true">
              {item.pain}.
            </span>
          ))}
        </TextLoop>
      </h2>
    </div>
  </section>
);

PromoLooper.propTypes = {
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  add: PropTypes.array
};

export default PromoLooper;
