/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react'
import {
  Button,
  Form, // Radio, InputNumber,
  Input,
  Select,
  // TreeSelect, Select
} from 'antd'

import PropTypes from 'prop-types'
import { FormContext } from '../tabs'

const { Option } = Select

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

const lengthClasses = ['mm', 'cm', 'inch']
const weightClasses = ['kg', 'gm', 'pound', 'ounce']

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const BShipping = ({ hasTitle, hideSubmit, formControls }) => {
  console.log('hasTitle', hasTitle)
  //  const initialValues = data || {}

  const formContext = useContext(FormContext)

  const {
    onChange,
    values,
    // setValues,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,
    setValues,
    // validateForm,
  } = formControls || formContext

  const formItems = [
    { heading: hasTitle ? 'Shipping Attributes' : undefined },
    {
      type: (
        <Select
          onChange={a => setValues(prev => ({ ...prev, lengthClass: a }))}
          value={values.lengthClass}
          name="lengthClass"
        >
          {lengthClasses.map(i => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ),
      key: 'lengthClass',
      label: 'Length Class',
      error: errors.lengthClass,
    },
    {
      type: (
        <Select
          onChange={a => setValues(prev => ({ ...prev, weightClass: a }))}
          value={values.weightClass}
          name="weightClass"
        >
          {weightClasses.map(i => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ),
      key: 'weightClass',
      label: 'Weight Class',
      error: errors.weightClass,
    },
    {
      type: (
        <>
          <Input value={values.height} name="height" />
          {/* <span>{values.lengthClass}</span> */}
        </>
      ),
      key: 'height',
      label: 'Height',
      error: errors.height,
    },
    {
      type: (
        <>
          <Input value={values.length} name="length" />
        </>
      ),
      key: 'length',
      label: 'Length',
      error: errors.length,
    },
    {
      type: (
        <>
          <Input value={values.width} name="width" />
        </>
      ),
      key: 'width',
      label: 'Width',
      error: errors.width,
    },
    {
      type: (
        <>
          <Input value={values.weight} name="weight" />
        </>
      ),
      key: 'weight',
      label: 'Weight',
      error: errors.weight,
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

          if (item.dependency) {
            if (values[item.dependency] === 'true' || values[item.dependency] === true) {
              console.log(values[item.dependency], typeof values[item.dependency])
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
            }
            return null
          }

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

BShipping.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

BShipping.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
} // use form controls here same as a general

export default BShipping
