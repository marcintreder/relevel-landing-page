import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/blog-post";

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  let locationFake={"pathname": "/blog/2020-04-17-home-office-ergonomics/"}

  /*Template defaults*/
  const promoimage = entry.getIn(["data", "promoimage"]) === undefined ? "/img/promo_placeholder.png" : entry.getIn(["data", "promoimage"]);
  const featuredimage = entry.getIn(["data", "featuredimage"]) === undefined ? "/img/featured_placeholder.png" : entry.getIn(["data", "featuredimage"])
  const cardimage = entry.getIn(["data", "cardimage"]) === undefined ? "/img/card_placeholder.png" : entry.getIn(["data", "cardimage"])

  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      title={entry.getIn(["data", "title"])}
      location={locationFake}
      id={entry.getIn(["data", "id"])}
      promoimage={promoimage}
      promoimageTitle={entry.getIn(["data", "promoimageTitle"])}
      promoimageAlt={entry.getIn(["data", "promoimageAlt"])}
      promoimageUrl={entry.getIn(["data", "promoimageUrl"])}
      promoimageAuthor={entry.getIn(["data", "promoimageAuthor"])}
      featuredimage={featuredimage}
      cardimage={cardimage}
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
