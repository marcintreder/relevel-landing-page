import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll/BlogRoll";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <Helmet title={`${tag} | ${title}`} />
            <h1 className="tags-header">{this.props.pageContext.tag}</h1>
            <Breadcrumb secondPage="blog" currentPage={this.props.pageContext.tag} />
            <div className="container tags-container">
              <h2 className="tags-articles-header">Articles & Resources</h2>
              <BlogRoll posts={this.props.data.allMarkdownRemark.edges} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            cardimage {
              childImageSharp {
                fluid(maxWidth: 360, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
