import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        image={data.image}
        title={data.title}
        imageAlt={data.imageAlt}
        imageTitle={data.imageTitle}
        subheading={data.subheading}
        comingsoon={data.comingsoon || {}}
        prosection={data.prosection || {}}
        everything={data.everything || {}}
        createdBy={data.createdBy || {}}
        newLifeGrid={data.newLifeGrid || {}}
        steps={data.steps || {}}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview