import React from "react";
import PropTypes from "prop-types";

const EditorialContent = ({ title, quote, description, image, imageAlt, imageTitle, direction }) => (
  <div className="container">
    <h2 className="editorial-content-header">{title}</h2>
    <div
      className={`editorial-content-container ${
        direction === "left"
          ? "editorial-content-left"
          : "editorial-content-right"
      }`}
    >
      {quote ? (
        <blockquote className="editorial-content-quote">{`“${quote}”`}</blockquote>
      ) : (
        ""
      )}
      {image ? (
        <div
          role="img"
          aria-label={imageAlt}
          alt={imageAlt}
          title={imageTitle}
          className="editorial-content-image"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
          }}
        ></div>
      ) : (
        ""
      )}
      <div className="editorial-content-text">
        {description.map((item, i) => (
          <span key={i} className="editorial-content-text__paragraph">
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

EditorialContent.propTypes = {
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  quote: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.oneOf(["left", "right"])
};

export default EditorialContent;
