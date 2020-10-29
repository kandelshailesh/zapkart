/* eslint-disable no-underscore-dangle */
import React from 'react'
import Editor from 'components/Editor'
import PropTypes from 'prop-types'
import Form from 'components/Form'

const Description = ({ initialValues, schema, onSubmit, title }) => {
  const formItems = [
    { heading: title, key: 'title' },
    {
      type: (
        <Editor
          name="description"
          placeholder="Write something..."
          // editorHtml={values.description || ''}
        />
      ),

      label: 'Description',
      key: 'description',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          name="keyBenefits"
          // editorHtml={values.keyBenefits || ''}
        />
      ),
      key: 'keyBenefits',
      label: 'Key Benefits',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          name="directionsForUse"
          // editorHtml={values.directionsForUse || ''}
        />
      ),
      key: 'directionsForUse',
      label: 'Directions For Use',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          name="safetyInfo"
          // editorHtml={values.safetyInfo || ''}
        />
      ),
      key: 'safetyInfo',
      label: 'Safety Info',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          name="otherInfo"
          // editorHtml={values.otherInfo || ''}
        />
      ),
      key: 'otherInfo',
      label: 'Other Info',
    },
  ]

  return (
    <Form initialValues={initialValues} schema={schema} formItems={formItems} onSubmit={onSubmit} />
  )
}

Description.propTypes = {
  initialValues: PropTypes.object,
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
}

Description.defaultProps = {
  initialValues: {},
  schema: {},
  onSubmit: null,
  title: null,
}

export default Description
