import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

export const TermsTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet
}) => {
  const TermsContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container terms-container">
        <Breadcrumb currentPage={title} />
        <h1>{title}</h1>
        <TermsContent content={content} className="terms-content" />
      </div>
    </section>
  );
};

TermsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const Terms = ({ data, location }) => {
  console.log(data);
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <TermsTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Relevel Policies">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  );
};

Terms.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Terms;

export const pageQuery = graphql`
  query TermsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
