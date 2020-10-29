/* eslint-disable no-unused-vars */
import React from 'react'
import { Form as AntdForm, Button, DatePicker, InputNumber, Select, Radio, Input } from 'antd'
import Upload from 'components/Upload'
import Editor from 'components/Editor'
// import moment from 'moment'
import PropTypes from 'prop-types'
import useFormValidation from 'hooks/useFormValidation'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

const FormContext = React.createContext({})
const FormProvider = FormContext.Provider
export const FormConsumer = FormContext.Consumer

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

  console.log('errors', errors)
  console.log('errors', values)

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
        console.log('formItem', item)
        if (item.heading) {
          console.log('a heading')
          if (!isEmpty(item.heading)) {
            console.log('returning heading')
            return (
              <h4 key={item.heading} className="text-black mb-3">
                <strong>{item.heading}</strong>
              </h4>
            )
          }
          console.log('returning null')
          return null
        }
        if (item.dependency) {
          if (values[item.dependency] === 'true' || values[item.dependency] === true) {
            console.log(values[item.dependency], typeof values[item.dependency])
            return (
              <AntdForm.Item
                key={item.key}
                label={item.label}
                validateStatus={errors[item.key] && 'error'}
                help={errors[item.key]}
              >
                {item.type}
              </AntdForm.Item>
            )
          }
          return null
        }

        // const recursiveAddProps = (children) => {
        //   return React.Children.map(children, child => {
        //     if (child.type !== GrandChild) {
        //       if (child.props) recursiveAddProps(child.props.children);
        //       return child;
        //     }
        //     return React.cloneElement(child, childProps);
        //   });
        // }

        const injectPropsIntoChild = () => {
          // console.log(item.type)
          // console.log(item.type.props)
          const child = item.type
          React.Children.map(item.type, i => console.log(i))
          const { name } = item.type.props
          console.log(name, item.type.type)
          if (!child) return null
          let value = values[item.key]
          console.log(child.type, values[item.key])
          console.log(child.type.displayName)
          console.log(child.name)
          console.log(child.type.name === DatePicker.name, 'is DatePicker?')
          switch (true) {
            case child.type === DatePicker: // Date picker
              console.log('this a date picker', values[item.key], moment(values[item.key]))
              return React.cloneElement(child, {
                onChange: val => {
                  setValues(a => ({ ...a, [item.key]: new Date(val).toISOString() }))
                },
                value: moment(value),
              })
            case child.type === Editor:
              return React.cloneElement(child, {
                onChange: val => {
                  setValues(a => ({ ...a, [item.key]: val }))
                },
                value,
                editorHtml: value || '',
              })

            case child.type !== Input:
              if (value === 'true') value = true
              if (value === 'false') value = false
              return React.cloneElement(child, {
                onChange: val => {
                  console.log(child, val, child.type)
                  setValues(a => ({ ...a, [item.key]: val }))
                },
                value,
              })
            default:
              // mainly for Input cases
              return React.cloneElement(child, { value })
          }
        }
        return (
          <AntdForm.Item
            key={item.key}
            label={item.label}
            validateStatus={errors[item.key] && 'error'}
            help={errors[item.key]}
          >
            {item.type ? injectPropsIntoChild() : null}
          </AntdForm.Item>
        )
      })}
      {onSubmitForm && (
        <AntdForm.Item {...tailFormItemLayout}>
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        </AntdForm.Item>
      )}
    </AntdForm>
  )
}

// if exporting, import named in componnet
Form.Provider = ({ initialValues, schema, onSubmit: submitForm, children }) => {
  const handleSubmit = async () => {
    await submitForm(values)
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

  return (
    <FormProvider
      value={{
        initialValues,
        schema,
        onSubmit,
        setValues,
        onChange,
        onBlur,
        errors,
        isSubmitting,
      }}
    >
      {children}
    </FormProvider>
  )
}

Form.Consumer = ({ children }) => {
  const context = React.useContext(FormContext)
  console.log(context)
  return children(context)
}

const propTypes = {
  initialValues: PropTypes.object,
  formItemLayout: PropTypes.object,
  tailFormItemLayout: PropTypes.object,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  formItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const defaultProps = {
  onSubmit: null,
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

Form.propTypes = propTypes
Form.defaultProps = defaultProps
Form.Provider.defaultProps = defaultProps

Form.Provider.propTypes = {
  ...omit(propTypes, ['formItemLayout', 'tailFormItemLayout', 'formItems']),
}
Form.Provider.defaultProps = {
  ...omit(defaultProps, ['formItemLayout', 'tailFormItemLayout', 'formItems']),
}

export default Form
