import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { DiscussionEmbed } from "disqus-react";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import useSiteMetadata from "../hooks/siteMetedata";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  id,
  location
}) => {
  const PostContent = contentComponent || Content;

  /* disqus integration */
  const { siteURL } = useSiteMetadata();
  const pageURL = `${siteURL}${location.pathname}`;
  let disqusConfig = {
    url: pageURL,
    identifier: `relevel-1${id}`,
    title: title
  };

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content blogpost-container">
        <article className="container blogpost-text">
          <h1 className="blogpost-header">{title}</h1>
          <Breadcrumb secondPage="blog" currentPage={title} />
          <p>{description}</p>
          <PostContent content={content} className="blogpost-content" />
        </article>
        <aside className="blogpost-aside">
          <h2>Share</h2>
          <div>
            <FacebookShareButton url={pageURL}>
              <FacebookIcon size={32} />
            </FacebookShareButton>
            <TwitterShareButton url={pageURL}>
              <TwitterIcon size={32} />
            </TwitterShareButton>
            <LinkedinShareButton url={pageURL}>
              <LinkedinIcon size={32} />
            </LinkedinShareButton>
            <WhatsappShareButton url={pageURL}>
              <WhatsappIcon size={32} />
            </WhatsappShareButton>
          </div>
          {tags && tags.length ? (
            <div className="blogpost-tags">
              <h2>Read More</h2>
              <ul className="blogpost-taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
      <div className="container blog-discussion">
        <DiscussionEmbed config={disqusConfig} shortname="relevel-1" />
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        location={location}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        id={post.id}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
