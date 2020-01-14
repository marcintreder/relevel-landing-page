import React from "react";
import PropTypes from "prop-types";

const BlogCard = ({ promoimage, title, author }) => (
    <div 
        className="blogcard-cointainer"
        style={{
            backgroundImage: `url(${
              !!promoimage.childImageSharp ? promoimage.childImageSharp.fluid.src : promoimage
            })`
          }}
        >
        <h3 className="blogcard-header">{title}</h3>
        <address className="blogcard-author">by {author}</address>
    </div>
);

BlogCard.propTypes = {
  promoimage: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string
};

export default BlogCard;
