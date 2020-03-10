import React from "react";
import PropTypes from "prop-types";
import BlogCard from "../BlogCard/BlogCard";

export default class BlogRoll extends React.Component {
  render() {
    let posts = this.props.posts;
    return (
      <div className="blogroll-container">
        <div className="blogroll-posts">
          {posts.map(({ node: post }) => (
              <BlogCard
                key={post.id} 
                className="blogroll-cards"
                promoimage={post.frontmatter.cardimage}
                title={post.frontmatter.title}
                author={post.frontmatter.author}
                link={post.fields.slug}
              />
          ))}
        </div>
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  posts: PropTypes.array
};