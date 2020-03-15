import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const BlogCard = ({ image, imageTitle, imageAlt, title, author, link, ...props }) => (
    <Link 
        to={link}
        className={`blogcard-cointainer ${props.className}`}
        style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
          }}
        role="img"
        alt={imageAlt}
        aria-label={imageTitle}
        title={imageTitle}
        >
        <h3 className="blogcard-header">{title}</h3>
        <address className="blogcard-author">by {author}</address>
    </Link>
);

BlogCard.propTypes = {
  image: PropTypes.object,
  imageTitle: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  link: PropTypes.string
};

export default BlogCard;
