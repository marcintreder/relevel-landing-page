import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import BlogRoll from "../BlogRoll/BlogRoll";
import CategoryList from "../CategoryList/CategoryList";
import ComingSoon from "../ComingSoon/ComingSoon";

const BlogIndexContent = props => (
  <div className="blogcontent-wrapper">
    <div className="container blogcontent-container">
      <div className="blogcontent-posts">
        <h3 className="blogcontent-header">New Articles</h3>
        <BlogRoll posts={props.posts} />
      </div>
      <CategoryList taglist={props.tags} title={props.titleCat} />
    </div>
    <ComingSoon
      title="Healthy Body in the Desk-Bound World"
      image={props.comingSoon.markdownRemark.frontmatter.comingsoon.image}
      description={
        props.comingSoon.markdownRemark.frontmatter.comingsoon.description
      }
    />
  </div>
);

BlogIndexContent.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  titleCat: PropTypes.string,
  comingSoon: PropTypes.object
};

export default props => (
  <StaticQuery
    query={graphql`
      query BlogIndexContent {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            comingsoon {
              image {
                childImageSharp {
                  fluid(maxWidth: 360, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              description
            }
          }
        }
      }
    `}
    render={data => <BlogIndexContent comingSoon={data} {...props} />}
  />
);

/*
  <div className="container blogcontent-container">
    <div className="blogcontent-posts">
      <h3 className="blogcontent-header">New Articles</h3>
      <BlogRoll posts={props.posts} />
    </div>
    <CategoryList taglist={props.tags} title={props.titleCat} />
    {console.log(props)}
  </div>
*/
