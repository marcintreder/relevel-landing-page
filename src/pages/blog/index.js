import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll/BlogRoll";
import PromoBlog from "../../components/PromoBlog/PromoBlog";
import CategoryList from "../../components/CategoryList/CategoryList";

class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    let promoPost = posts.find(obj => {
      return obj.node.frontmatter.featuredpost === true;
    });

    let promoPostId = promoPost.node.id;
    let filteredPosts = posts.filter(obj => {
      return obj.node.id !== promoPostId;
    });

    let tagList = [];
    console.log(promoPost);
    posts.map(item => {
      if (item.node.frontmatter.tags.length === 1) {
        tagList.push(item.node.frontmatter.tags[0]);
      } else {
        item.node.frontmatter.tags.map(x => {
          tagList.push(x);
        });
      }
    });

    return (
      <Layout>
        <PromoBlog
          title={promoPost.node.frontmatter.title}
          description={promoPost.node.excerpt}
          image={promoPost.node.frontmatter.featuredimage}
          link={promoPost.node.fields.slug}
        />
        <section className="section">
          <div className="container">
            <div className="content">
              <h3>New Articles</h3>
              <BlogRoll posts={filteredPosts} />
            </div>
            <CategoryList
              taglist={tagList}
              title="Find Out More"
              className="blogroll-categories"
            />
          </div>
        </section>
      </Layout>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogIndexQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                tags
                title
                templateKey
                author
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1440, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                promoimage {
                  childImageSharp {
                    fluid(maxWidth: 360, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
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
    `}
    render={(data, count) => <BlogIndexPage data={data} count={count} />}
  />
);
