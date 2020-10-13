import React from 'react'
import {
  Form as AntdForm,
  Button,
  Input,
  // DatePicker,
  //  InputNumber, Select, Radio
} from 'antd'
// import Upload from 'components/Upload'
// import moment from 'moment'
import PropTypes from 'prop-types'
import useFormValidation from 'hooks/useFormValidation'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'

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

  // console.log('values', values)

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

        const injectPropsIntoChild = () => {
          // console.log(item.type)
          // console.log(item.type.props)

          const { name } = item.type.props
          console.log(name)
          const child = item.type
          if (!item.type) return null
          // if (
          //   child.type === InputNumber ||
          //   child.type === Upload ||
          //   child.type === Select ||
          //   child.type === Radio
          // )
          if (child.type !== Input)
            return React.cloneElement(item.type, {
              onChange: val => {
                console.log(item.key, val, item.type.type)
                setValues(a => ({ ...a, [item.key]: val }))
              },
              value: values[item.key],
            })
          let value = values[item.key]
          if (value === 'true') value = true
          if (value === 'false') value = false
          return React.cloneElement(item.type, { value })
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
