import React from 'react'
import { Form as AntdForm, Button, InputNumber, Select } from 'antd'
import Upload from 'components/Upload'
import PropTypes from 'prop-types'
import useFormValidation from 'hooks/useFormValidation'

/**
 * handling form with useFormValidation hook
 * @param {Object} intialValues initial values object
 * @param {Object} schema for validation
 * @param {Function} onSubmit callback after form submit
 * @param {Array} formItems
 * @param {Object} formItemLayout for setting wrapper & label columns in various screen sizes
 * @param {Object} tailFormItemLayout for setting wrapper and label columns in form footer
 */
const Form = ({
  initialValues,
  schema,
  onSubmit: onSubmitForm,
  formItems,
  formItemLayout,
  tailFormItemLayout,
}) => {
  const handleSubmit = async () => {
    await onSubmitForm(values)
    setSubmitting(false)
  }

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(initialValues, schema, handleSubmit, true)

  console.log('values', values)

  return (
    <AntdForm
      // setSubmitting={setSubmitting}
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

        const injectPropsIntoChild = () => {
          console.log(item.type.props)
          const { name } = item.type.props
          const child = item.type
          if (!item.type) return null
          if (child.type === InputNumber || child.type === Upload || child.type === Select)
            return React.cloneElement(item.type, {
              onChange: val => {
                console.log(item.key, val, item.type.type)
                setValues(a => ({ ...a, [name || item.key]: val }))
              },
              value: values[name || item.key],
            })
          return React.cloneElement(item.type, { value: values[name || item.key] })
        }
        return (
          <AntdForm.Item
            key={item.key}
            label={item.label}
            validateStatus={errors[item.key] && 'error'}
            help={errors[item.key]}
          >
            {injectPropsIntoChild()}
          </AntdForm.Item>
        )
      })}
      <AntdForm.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  )
}

Form.propTypes = {
  initialValues: PropTypes.object,
  formItemLayout: PropTypes.object,
  tailFormItemLayout: PropTypes.object,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

Form.defaultProps = {
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      lg: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      lg: { span: 12 },
      // lg: { span: 18 },
    },
  },
  tailFormItemLayout: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        // span: 16,
        // offset: 8,
        span: 16,
        offset: 4,
      },
    },
  },
  initialValues: {},
}

export default Form
