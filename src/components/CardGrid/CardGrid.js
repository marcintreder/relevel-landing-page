import React from "react";
import PropTypes from "prop-types";

const CardGrid = ({ description, title, items, more, headerCentered, dense }) => (
  <section className="section">
    <div className="container cardgrid-container">
      <div className="cardgrid-header">
        <h2 className="cardgrid-title">{title}</h2>
        {description ? (
          <span className="cardgrid-description">{description}</span>
        ) : (
          ""
        )}
      </div>
      <ul className={`cardgrid-list ${dense ? 'cardgrid-list--dense' : ''}`}>
        {items.map((x, i) => (
          <li className="card-item" key={`card${i}`}>
            {x.item.image ? (
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
              ></div>
            ) : (
              ""
            )}
            <h3 className={`card-header ${headerCentered ? 'card-header--center' : ''}`}>{x.item.title}</h3>
            <span className="card-description">{x.item.description}</span>
          </li>
        ))}
        {more ? (
          <li className="card-last-item">
            <div>& More</div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  </section>
);

CardGrid.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  more: PropTypes.bool,
  headerCentered: PropTypes.bool,
  dense: PropTypes.bool
};

export default CardGrid;
