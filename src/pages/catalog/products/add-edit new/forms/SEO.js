/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input } from 'antd'

import PropTypes from 'prop-types'
import Form from 'components/Form'

const CSEO = ({ initialValues, schema, onSubmit, title }) => {
  const formItems = [
    { heading: title },
    {
      type: <Input name="metaTitle" />,
      label: 'Meta Title',
      key: 'metaTitle',
    },
    {
      type: <Input name="metaDescription" />,
      key: 'metaDescription',
      label: 'Meta Description',
    },
    {
      type: <Input name="metaKeywords" />,
      key: 'metaKeywords',
      label: 'Meta Keywords',
    },
  ]

  return (
    <Form initialValues={initialValues} schema={schema} formItems={formItems} onSubmit={onSubmit} />
  )
}

CSEO.propTypes = {
  initialValues: PropTypes.object,
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
}

CSEO.defaultProps = {
  initialValues: {},
  schema: {},
  onSubmit: null,
  title: null,
}

export default CSEO
