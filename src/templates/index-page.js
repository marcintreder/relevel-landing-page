import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import Hero from "../components/Hero/Hero";
import PromoLooper from "../components/PromoLooper/PromoLooper";
import ComingSoon from "../components/ComingSoon/ComingSoon";


export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  prosection,
  comingsoon,
  everything,
  description,
  intro
}) => (
  <div>
    <Hero image={image} title={title} subheading={subheading} />
    <PromoLooper image={prosection.image} title={prosection.title} add={prosection.painAddition} />
    <ComingSoon image={comingsoon.image} title={comingsoon.title} description={comingsoon.description} />
    <section className="section">
      <div className="container everything-container">
        <h2 className="everything-header">{everything.title}</h2>
        <ul className="everything-list">
        {everything.list.map((item,i) => <li className="everything-list-item" key={"item" + i}>
            <div className="everything-list-image" key={"image" + i} id={"image" + i} style={{
            backgroundImage: `url(${
              !!item.feature.image.childImageSharp
                ? item.feature.image.childImageSharp.fluid.src
                : item.feature.image
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}>
            <h3 className="everything-header-3" key={"header" + i}>{item.feature.title}</h3>
          </div>
            <div className="everything-list-description" key={"desc" + i}>{item.feature.description}</div>
          </li>)}
          
        </ul>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  prosection: PropTypes.object,
  comingsoon: PropTypes.object,
  everything: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log(frontmatter);
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        prosection={frontmatter.prosection}
        comingsoon={frontmatter.comingsoon}
        everything={frontmatter.everything}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        comingsoon {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        everything {
          title
          list {
            feature {
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
        prosection {
          title
          painAddition {
            pain
          }
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
