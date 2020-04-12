import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";
import PromoBlog from "../../components/PromoBlog/PromoBlog";
import BlogIndexContent from "../../components/BlogIndexContent/BlogIndexContent";
import Hero from "../../components/Hero/Hero";

export class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    let promoPost = posts.find(obj => {
      return obj.node.frontmatter.featuredpost === true;
    });

    promoPost = promoPost ? promoPost : posts[0];
    
    let promoPostId = promoPost.node.id;
    let filteredPosts = posts.filter(obj => {
      return obj.node.id !== promoPostId;
    });

    let tagList = [];

    posts.map(item => {
      if (item.node.frontmatter.tags.length === 1) {
        return tagList.push(item.node.frontmatter.tags[0]);
      } else {
        return item.node.frontmatter.tags.map(x => tagList.push(x));
      }
    });
    console.log(promoPost.node.fields.slug)

    return (
      <Layout>
        <Helmet>
          <title>Relevel Blog. Defeat lower back pain, shoulder pain, carpal tunnel and other injuries caused by desk jobs!</title>
          <meta
            name="description"
            content="Professional advise and training tailored to defeat injuries caused by the sedentary lifestyle."
          />
        </Helmet>
        <Hero 
          title={promoPost.node.frontmatter.title}
          subheading={promoPost.node.excerpt}
          image={promoPost.node.frontmatter.featuredimage}
          signupForm={false}
          readOnLink={promoPost.node.fields.slug}
          linkedHeader={promoPost.node.fields.slug}
          eyeBrow="relevel blog"
        />
        <section className="section">
          <BlogIndexContent
            tags={tagList}
            posts={filteredPosts}
            titleCat={"Find Out More"}
          />
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
                featuredimageAlt
                featuredimageTitle
                promoimage {
                  childImageSharp {
                    fluid(maxWidth: 360, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                promoimageAlt
                promoimageTitle
                cardimageAlt
                cardimageTitle
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

/*
<PromoBlog
          title={promoPost.node.frontmatter.title}
          description={promoPost.node.excerpt}
          image={promoPost.node.frontmatter.featuredimage}
          imageAlt={promoPost.node.frontmatter.featuredimageAlt}
          imageTitle={promoPost.node.frontmatter.featuredimageTitle}
          link={promoPost.node.fields.slug}
        />

*/