/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Button, Form } from 'antd'
import Editor from 'components/Editor'
import PropTypes from 'prop-types'
import { FormContext } from '../tabs'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 16 },
    // lg: { span: 18 },
  },
}

const Description = ({ hideSubmit, hasTitle, formControls }) => {
  const formContext = React.useContext(FormContext)

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    setValues,
    // setSubmitting,
    isSubmitting,

    // validateForm,
  } = formControls || formContext

  console.log('values', values)

  // eslint-disable-next-line no-unused-vars
  const handleEditorChange = React.useCallback((val, name) => {
    console.log(name, val)
    setValues(prev => ({
      ...prev,
      [name]: val,
    }))
  }, [])
  // "description"
  // "keyBenefits"
  // "directionsForUse"
  // "safetyInfo"
  // "otherInfo"
  const formItems = [
    { heading: hasTitle ? 'Extra Info' : undefined },
    {
      type: (
        <Editor
          onChange={handleEditorChange}
          name="description"
          placeholder="Write something..."
          editorHtml={values.description || ''}
        />
      ),

      label: 'Description',
      key: 'description',
      error: errors.description,
    },
    {
      type: (
        <Editor
          onChange={handleEditorChange}
          placeholder="Write something..."
          name="keyBenefits"
          editorHtml={values.keyBenefits || ''}
        />
      ),
      key: 'keyBenefits',
      label: 'Key Benefits',
      error: errors.keyBenefits,
    },
    {
      type: (
        <Editor
          onChange={handleEditorChange}
          placeholder="Write something..."
          name="directionsForUse"
          editorHtml={values.directionsForUse || ''}
        />
      ),
      key: 'directionsForUse',
      label: 'Directions For Use',
      error: errors.directionsForUse,
    },
    {
      type: (
        <Editor
          onChange={handleEditorChange}
          placeholder="Write something..."
          name="safetyInfo"
          editorHtml={values.safetyInfo || ''}
        />
      ),
      key: 'safetyInfo',
      label: 'Safety Info',
      error: errors.safetyInfo,
    },
    {
      type: (
        <Editor
          onChange={handleEditorChange}
          placeholder="Write something..."
          name="otherInfo"
          editorHtml={values.otherInfo || ''}
        />
      ),
      key: 'otherInfo',
      label: 'Other Info',
      error: errors.otherInfo,
    },
  ]

  return (
    <>
      <Form
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
        {...formItemLayout}
      >
        {formItems.map(item => {
          if (item.heading)
            return (
              <h4 key={item.heading} className="text-black mb-3">
                <strong>{item.heading}</strong>
              </h4>
            )

          return (
            <Form.Item
              key={item.key}
              label={item.label}
              validateStatus={item.error && 'error'}
              help={item.error}
            >
              {item.type}
            </Form.Item>
          )
        })}
        {!hideSubmit && (
          <Form.Item>
            <Button disabled={isSubmitting} type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  )
}

Description.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

Description.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default Description
