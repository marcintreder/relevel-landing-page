import React from "react";
import PropTypes from "prop-types";
import TextLoop from "react-text-loop";

const PromoLooper = ({ image, title, add }) => (
  <section className="section">
    <div className="container prosection-container">
      <div
        className="prosection-image"
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
        <TextLoop interval={6000} delay={2000} mask>
          {add.map((item, i) => (
            <span className="prosection-paindadd" key={`pain` + i}>
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
  title: PropTypes.string,
  add: PropTypes.array
};

export default PromoLooper;
