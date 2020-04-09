import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Hero from "../components/Hero/Hero";
import PromoLooper from "../components/PromoLooper/PromoLooper";
import ComingSoon from "../components/ComingSoon/ComingSoon";
import PromoSteps from "../components/PromoSteps/PromoSteps";
import PromoHorizontal from "../components/PromoHorizontal/PromoHorizontal";
import CardGrid from "../components/CardGrid/CardGrid";

export const IndexPageTemplate = ({
  image,
  imageAlt,
  imageTitle,
  title,
  subheading,
  prosection,
  comingsoon,
  everything,
  createdBy,
  newLifeGrid,
  steps
}) => (
  <div>
    <Hero image={image} imageAlt={imageAlt} imageTitle={imageTitle} title={title} subheading={subheading} />
    <PromoLooper image={prosection.image} imageAlt={prosection.imageAlt} imageTitle={prosection.imageTitle} title={prosection.title} add={prosection.painAddition} />
    <ComingSoon image={comingsoon.image} imageAlt={comingsoon.imageAlt} imageTitle={comingsoon.imageTitle} title={comingsoon.title} description={comingsoon.description} />
    <CardGrid title={steps.title} items={steps.list} />
    <PromoSteps list={everything.list} title={everything.title} />
    <PromoHorizontal title={createdBy.title} text={createdBy.description} image={createdBy.image} imageAlt={createdBy.imageAlt} imageTitle={createdBy.imageTitle} />
    <CardGrid title={newLifeGrid.title} description={newLifeGrid.description} items={newLifeGrid.list} more headerCentered />
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  subheading: PropTypes.string,
  prosection: PropTypes.object,
  comingsoon: PropTypes.object,
  everything: PropTypes.object,
  createdBy: PropTypes.object,
  newLifeGrid: PropTypes.object,
  steps: PropTypes.object
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        imageAlt={frontmatter.imageAlt}
        imageTitle={frontmatter.imageTitle}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        prosection={frontmatter.prosection}
        comingsoon={frontmatter.comingsoon}
        everything={frontmatter.everything}
        createdBy={frontmatter.createdBy}
        newLifeGrid={frontmatter.newLifeGrid}
        steps={frontmatter.steps}
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
        imageAlt
        imageTitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
        comingsoon {
          title
          description
          imageAlt
          imageTitle
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
              imageAlt
              imageTitle
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
          imageAlt
          imageTitle
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
        createdBy {
          title
          description
          imageAlt
          imageTitle
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        newLifeGrid {
          title
          description
          list {
            item {
              title
              description
              imageAlt
              imageTitle
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
        steps {
          title
          list {
            item {
              title
              description
            }
          }
        }
      }
    }
  }
`;