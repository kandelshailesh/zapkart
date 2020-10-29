/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  // Radio, InputNumber,
  Input,
  Select,
  // TreeSelect, Select
} from 'antd'

import Form from 'components/Form'

import PropTypes from 'prop-types'

const { Option } = Select

const lengthClasses = ['mm', 'cm', 'inch']
const weightClasses = ['kg', 'gm', 'pound', 'ounce']

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const BShipping = ({ initialValues, schema, onSubmit, title }) => {
  const formItems = [
    { heading: title || '', key: 'title' },
    {
      type: (
        <Select name="lengthClass">
          {lengthClasses.map(i => (
            <Option key={i}>{i}</Option>
          ))}
        </Select>
      ),
      key: 'lengthClass',
      label: 'Length Class',
    },
    {
      type: (
        <Select name="weightClass">
          {weightClasses.map(i => (
            <Option key={i}>{i}</Option>
          ))}
        </Select>
      ),
      key: 'weightClass',
      label: 'Weight Class',
    },
    {
      type: <Input name="height" />,
      key: 'height',
      label: 'Height',
    },
    {
      type: <Input name="length" />,
      key: 'length',
      label: 'Length',
    },
    {
      type: <Input name="width" />,
      key: 'width',
      label: 'Width',
    },
    {
      type: <Input name="weight" />,
      key: 'weight',
      label: 'Weight',
    },
  ]

  return (
    <Form initialValues={initialValues} schema={schema} formItems={formItems} onSubmit={onSubmit} />
  )
}

BShipping.propTypes = {
  initialValues: PropTypes.object,
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
}

BShipping.defaultProps = {
  initialValues: {},
  schema: {},
  onSubmit: null,
  title: null,
} // use form controls here same as a general

export default BShipping
