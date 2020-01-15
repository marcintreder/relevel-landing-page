import React from "react";
import PropTypes, { oneOf } from "prop-types";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import BlogCard from "../BlogCard/BlogCard";

export default class BlogRoll extends React.Component {
  render() {
    //const { data } = this.props.data;
    //const { edges: posts } = data.allMarkdownRemark;
    let posts = this.props.posts;

    return (
      <div className="blogroll-container">
        <div className="blogroll-posts">
          {posts.map(({ node: post }) => (
            <div key={post.id}>
              <BlogCard
                promoimage={post.frontmatter.cardimage}
                title={post.frontmatter.title}
                author={post.frontmatter.author}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

//         

/* 



*/
BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  posts: PropTypes.array
};