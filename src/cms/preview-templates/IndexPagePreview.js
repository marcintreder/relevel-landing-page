import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  console.log(entry)
  console.log(data)
  console.log(entry.getIn(['data']),)
  if (data) {
    return (
      <IndexPageTemplate
        image={data.image}
        title={data.title}
        subheading={data.subheading}
        comingsoon={data.comingsoon || {}}
        prosection={data.prosection || {}}
        everything={data.everything || {}}
        createdBy={data.createdBy || {}}
        newLifeGrid={data.newLifeGrid || {}}
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