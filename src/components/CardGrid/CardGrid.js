import React from "react";
import PropTypes from "prop-types";

const CardGrid = ({ description, title, items }) => (
  <section className="section">
    <div className="container cardgrid-container">
      <div className="cardgrid-header">
        <h2 className="cardgrid-title">{title}</h2>
        <span className="cardgrid-description">{description}</span>
      </div>
      <ul className="cardgrid-list">
        {items.map((x, i) => (
          <li 
            className="card-item"
            key={`card${i}`}
            >
            <div
              className="card-image"
              role="img"
              aria-label={x.item.imageAlt}
              alt={x.item.imageAlt}
              title={x.item.imageTitle}
              style={{
                backgroundImage: `url(${
                  !!x.item.image.childImageSharp
                    ? x.item.image.childImageSharp.fluid.src
                    : x.item.image
                })`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            >
              <h3 className="card-header">{x.item.title}</h3>
            </div>
            <span className="card-description">{x.item.description}</span>
          </li>
        ))}
        <li className="card-last-item"><div>& More</div></li>
      </ul>
    </div>
  </section>
);

CardGrid.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array
};

export default CardGrid;
