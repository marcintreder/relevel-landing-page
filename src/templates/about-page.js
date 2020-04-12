import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import SimpleHero from "../components/SimpleHero/SimpleHero";
import Hero from "../components/Hero/Hero";
import EditorialContent from "../components/EditorialContent/EditorialContent";
import ComingSoon from "../components/ComingSoon/ComingSoon";

export const AboutPageTemplate = ({
  header1,
  header2,
  description,
  image,
  imageAlt,
  imageTitle,
  aboutEmilia,
  familyBusiness,
  mission,
  comingsoon
}) => {
  return (
    <section className="section section--gradient about-container">
      <Helmet>
        <title>
          About Relevel App. The App to End Back Pain, Shoulder Pain and other
          injuries of sedentary lifestyle.
        </title>
        <meta
          name="description"
          content="Relevel strives to improve your wellbeing in the workplace! Relevel app has over 200 exercises targeting the most common aches associated with desk jobs. The personalized 15-minute workouts help you fit a healthy movement into your busy workday. No need to change into fitness clothes!"
        />
      </Helmet>
      <Hero
        title={`${header1}\n${header2}`}
        image={image}
        subheading={description}
        signupForm={false}
        eyeBrow="about relevel"
      />
      <EditorialContent
        title={mission.title}
        direction="right"
        quote={mission.missionStatement}
        description={[mission.description1, mission.description2]}
      />
      <EditorialContent
        title={aboutEmilia.title}
        image={aboutEmilia.image}
        imageAlt={aboutEmilia.imageAlt}
        imageTitle={aboutEmilia.imageTitle}
        direction="left"
        description={[
          aboutEmilia.description1,
          aboutEmilia.description2,
          aboutEmilia.description3
        ]}
      />
      <EditorialContent
        title={familyBusiness.title}
        image={familyBusiness.image}
        imageAlt={familyBusiness.imageAlt}
        imageTitle={familyBusiness.imageTitle}
        direction="right"
        description={[familyBusiness.description1, familyBusiness.description2]}
      />
      <ComingSoon
        image={comingsoon.image}
        imageAlt={comingsoon.imageAlt}
        imageTitle={comingsoon.imageTitle}
        title={comingsoon.title}
        description={comingsoon.description}
      />
    </section>
  );
};

AboutPageTemplate.propTypes = {
  header1: PropTypes.string.isRequired,
  header2: PropTypes.string.isRequired,
  description: PropTypes.string,
  mission: PropTypes.object,
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  aboutEmilia: PropTypes.object,
  familyBusiness: PropTypes.object,
  comingsoon: PropTypes.object
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <AboutPageTemplate
        header1={post.frontmatter.header1}
        header2={post.frontmatter.header2}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        imageAlt={post.frontmatter.imageAlt}
        imageTitle={post.frontmatter.imageTitle}
        aboutEmilia={post.frontmatter.aboutEmilia}
        familyBusiness={post.frontmatter.familyBusiness}
        mission={post.frontmatter.mission}
        comingsoon={post.frontmatter.comingsoon}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        header1
        header2
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageAlt
        imageTitle
        mission {
          title
          missionStatement
          description1
          description2
        }
        aboutEmilia {
          title
          description1
          description2
          description3
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
        familyBusiness {
          title
          description1
          description2
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
      }
    }
  }
`;
