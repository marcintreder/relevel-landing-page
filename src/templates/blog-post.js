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
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
  id,
  location,
  promoimage,
  promoimageTitle,
  promoimageAlt,
  promoimageUrl,
  promoimageAuthor,
  preview
}) => {
  const PostContent = contentComponent || Content;
  /* disqus integration */

 
    const siteURL = "https://relevelapp.com";
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
          <div
            className="blogpost-promo-image"
            role="img"
            aria-label={promoimageAlt}
            alt={promoimageAlt}
            title={promoimageTitle}
            style={{
              backgroundImage: `url(${
                !!promoimage.childImageSharp
                  ? promoimage.childImageSharp.fluid.src
                  : promoimage
              })`
            }}
          >
            <figcaption className="blogpost-promo-caption">
              Photo by {promoimageAuthor} on{" "}
              <a href={promoimageUrl}>Unsplash</a>
            </figcaption>
          </div>
          <PostContent content={content} className="blogpost-content" />
        </article>
        <aside className="blogpost-aside">
          <h2>Share</h2>
          <div>
            <FacebookShareButton url={pageURL} quote={title} hashtag="#relevel">
              <FacebookIcon size={32} />
            </FacebookShareButton>
            <TwitterShareButton
              title={title}
              url={pageURL}
              via="relevelapp"
              hashtags={["relevel", "health"]}
              related={["relevelapp"]}
            >
              <TwitterIcon size={32} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={pageURL}
              title={title}
              source="http://relevelapp.com"
            >
              <LinkedinIcon size={32} />
            </LinkedinShareButton>
            <WhatsappShareButton title={title} url={pageURL}>
              <WhatsappIcon size={32} />
            </WhatsappShareButton>
            <EmailShareButton
              subject={title}
              url={pageURL}
              body={`Hi! I just found this awesome blog post. Check this out:`}
            >
              <EmailIcon size={32} />
            </EmailShareButton>
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
      {!preview ? (
        <div className="container blog-discussion">
        <DiscussionEmbed config={disqusConfig} shortname="relevel-1" />
      </div>
      ) : ''}
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  id: PropTypes.string,
  location: PropTypes.object,
  tags: PropTypes.any,
  promoimage: PropTypes.object,
  promoimageTitle: PropTypes.string,
  promoimageAlt: PropTypes.string,
  promoimageUrl: PropTypes.string,
  promoimageAuthor: PropTypes.string,
  preview: PropTypes.bool
};

const BlogPost = ({ data, location }) => {
  console.log(location);
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        location={location ? location : { pathname: "/test" }}
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
        promoimage={post.frontmatter.promoimage}
        promoimageTitle={post.frontmatter.promoimageTitle}
        promoimageAlt={post.frontmatter.promoimageAlt}
        promoimageUrl={post.frontmatter.promoimageUrl}
        promoimageAuthor={post.frontmatter.promoimageAuthor}
        preview={false}
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
        promoimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        promoimageAlt
        promoimageTitle
        promoimageUrl
        promoimageAuthor
      }
    }
  }
`;
