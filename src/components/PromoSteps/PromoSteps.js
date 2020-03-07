import React from "react";
import PropTypes from "prop-types";

const PromoSteps = ({ title, list }) => (
  <section className="section">
    <div className="container everything-container">
      <h2 className="everything-header">{title}</h2>
      <ul className="everything-list">
        {list.map((item, i) => (
          <li className="everything-list-item" key={"item" + i}>
            <div
              className="everything-list-image"
              key={"image" + i}
              id={"image" + i}
              role="img"
              aria-label={item.feature.imageAlt}
              title={item.feature.imageTitle}
              alt={item.feature.imageAlt}
              style={{
                backgroundImage: `url(${
                  !!item.feature.image.childImageSharp
                    ? item.feature.image.childImageSharp.fluid.src
                    : item.feature.image
                })`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            >
              <h3 className="everything-header-3" key={"header" + i}>
                {item.feature.title}
              </h3>
            </div>
            <div className="everything-list-description" key={"desc" + i}>
              {item.feature.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

PromoSteps.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
};

export default PromoSteps;
