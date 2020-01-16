import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby"

const BlogCard = ({ promoimage, title, author, link, ...props }) => (
    <Link 
        to={link}
        className={`blogcard-cointainer ${props.className}`}
        style={{
            backgroundImage: `url(${
              !!promoimage.childImageSharp ? promoimage.childImageSharp.fluid.src : promoimage
            })`
          }}
        >
          {console.log(props)}
        <h3 className="blogcard-header">{title}</h3>
        <address className="blogcard-author">by {author}</address>
    </Link>
);

BlogCard.propTypes = {
  promoimage: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
  link: PropTypes.string
};

export default BlogCard;
