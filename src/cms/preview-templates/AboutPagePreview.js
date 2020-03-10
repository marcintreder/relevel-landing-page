import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  return(
  <AboutPageTemplate
    header1={data.header1}
    header2={data.header2}
    description={data.description}
    image={data.image}
    imageAlt={data.imageAlt}
    imageTitle={data.imageTitle}
    aboutEmilia={data.aboutEmilia}
    familyBusiness={data.familyBusiness}
    mission={data.mission}
    comingsoon={data.comingsoon}
  />
)}


AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default AboutPagePreview


