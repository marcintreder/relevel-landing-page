import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post";

const BlogPostPreview = ({ entry, widgetFor }) => {
  console.log(entry.getIn(["data", "promoimage"]))
  const tags = entry.getIn(["data", "tags"]);
  let locationFake={"pathname": "/blog/2020-04-17-home-office-ergonomics/"}
  console.log(locationFake.pathname)
  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      contentComponent={widgetFor("body")}
      title={entry.getIn(["data", "title"])}
      location={locationFake}
      id={entry.getIn(["data", "id"])}
      promoimage={entry.getIn(["data", "promoimage"])}
      promoimageTitle={entry.getIn(["data", "promoimageTitle"])}
      promoimageAlt={entry.getIn(["data", "promoimageAlt"])}
      promoimageUrl={entry.getIn(["data", "promoimageUrl"])}
      promoimageAuthor={entry.getIn(["data", "promoimageAuthor"])}
      tags={tags && tags.toJS()}
      preview={true}
      helmet={
        <Helmet titleTemplate="%s | Blog">
          <title>{entry.getIn(["data", "title"])}</title>
          <meta
            name="description"
            content={entry.getIn(["data", "description"])}
          />
        </Helmet>
      }
    />
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BlogPostPreview;

/*
<Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>

       tags={tags && tags.toJS()}  
       
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
  promoimageAuthor: PropTypes.string
*/
