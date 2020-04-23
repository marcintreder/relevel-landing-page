import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const BlogCard = ({ image, imageTitle, imageAlt, title, link, ...props }) => (
    <Link 
        to={link}
        className={`blogcard-cointainer ${props.className}`}
        >
        <div
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
          }}
          className="blogcard-image"
          role="img"
          alt={imageAlt}
          aria-label={imageTitle}
          title={imageTitle}
        >
        </div>
        <h3 className="blogcard-header">{title}</h3>
        <address className="blogcard-author">by Emilia Wysocka-Treder</address>
    </Link>
);

BlogCard.propTypes = {
  image: PropTypes.object,
  imageTitle: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string
};

export default BlogCard;
