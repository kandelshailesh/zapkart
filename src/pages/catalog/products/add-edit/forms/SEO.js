/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Button, Form, Input } from 'antd'

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
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const CSEO = ({ hideSubmit, hasTitle, formControls }) => {
  const formContext = React.useContext(FormContext)

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,

    // validateForm,
  } = formControls || formContext

  console.log('values', values)

  const formItems = [
    { heading: hasTitle ? 'SEO' : undefined },
    {
      type: <Input value={values.metaTitle} name="metaTitle" />,
      label: 'Meta Title',
      key: 'metaTitle',
      error: errors.metaTitle,
    },
    {
      type: <Input value={values.metaDescription} name="metaDescription" />,
      key: 'metaDescription',
      label: 'Meta Description',
      error: errors.metaDescription,
    },
    {
      type: <Input value={values.metaKeywords} name="metaKeywords" />,
      key: 'metaKeywords',
      label: 'Meta Keywords',
      error: errors.metaKeywords,
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

CSEO.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

CSEO.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default CSEO
