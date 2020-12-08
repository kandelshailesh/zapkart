import React from 'react'
import { Form as AntdForm, Button, DatePicker, Input, Select, Checkbox, TimePicker } from 'antd'
// import Upload from 'components/Upload'
import Editor from 'components/Editor'
// import moment from 'moment'
import PropTypes from 'prop-types'
import useFormValidation from 'hooks/useFormValidation'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import usePrevious from 'hooks/usePrevious'
import find from 'lodash/find'

export const FormContext = React.createContext({})
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
  onChange: onChangeProps,
  onCancel,
  className,
}) => {
  console.log('formItemLayout', formItemLayout, formItems)
  console.log('From customer attributes')
  console.log(initialValues)
  React.useEffect(() => {
    console.log('initialValues changed 3', initialValues)
  }, [initialValues, formItems])

  const contextValues = React.useContext(FormContext)

  const handleSubmit = async () => {
    setSubmitting(true)
    await onSubmitForm(values)
    setSubmitting(false)
  }

  const formObject = !isEmpty(contextValues)
    ? contextValues
    : useFormValidation(initialValues, schema, handleSubmit, true)

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
  } = formObject

  // console.log('onChangeProps', onChangeProps)

  console.log('values', values)
  console.log('errors', errors)

  const valuesToReset = [] // [{name:'a',on:'b'}]

  const handleFormChange = (a) => {
    onChange(a, () => {
      if (onChangeProps) onChangeProps(values)
    })
  }

  React.useEffect(() => {
    if (onChangeProps) onChangeProps(values)
  }, [values])

  const previousValues = usePrevious(values)

  // console.log('previousValues', previousValues)

  React.useEffect(() => {
    if (!isEmpty(previousValues)) {
      Object.entries(previousValues).forEach(([key, val]) => {
        if (val !== values[key]) {
          const valueToReset = find(valuesToReset, (i) => {
            // console.log(i.on, key)
            return i.on === key
          })
          if (!isEmpty(valueToReset)) {
            const resetFormItem = find(formItems, (i) => i.key === valueToReset.name)
            let resetValue = null
            if (!isEmpty(resetFormItem)) {
              if (resetFormItem.type) {
                const isSelectMultipleTag =
                  resetFormItem.type.type === Select &&
                  (resetFormItem.type.props.mode === 'multiple' ||
                    resetFormItem.type.props.mode === 'tags')
                if (isSelectMultipleTag) resetValue = []
              }
            }
            setValues((prev) => ({ ...prev, [valueToReset.name]: resetValue }))
          }
        }
      })
    }
  }, [values, valuesToReset])

  return (
    <AntdForm
      className={className}
      // setSubmitting={setSubmitting}
      onChange={handleFormChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        const { shouldRender = true } = item
        if (!shouldRender) return null
        if (item.heading) {
          // console.log('a heading')
          if (!isEmpty(item.heading)) {
            // console.log('returning heading')
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
            // console.log(values[item.dependency], typeof values[item.dependency])
            return (
              <AntdForm.Item
                className={item.className || ''}
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

        // console.log('valuesToReset', valuesToReset)

        const injectPropsIntoChild = () => {
          // console.log(item.type)
          // console.log(item.type.props)
          // console.log('resetOnChange', item.resetOnChange)
          if (typeof item.resetOnChange !== 'undefined')
            valuesToReset.push({ name: item.key, on: item.resetOnChange })
          // console.log('item.type', item.type)
          // const { name } = item.type.props
          // console.log(name, item.type.type)
          const child = item.type
          // console.log(child.props)
          // React.Children.map(item.type, i => console.log(i))
          // const { name } = item.type.props
          // console.log(name, item.type.type)
          if (!child) return null
          let value = values[item.key]
          // console.log('key value', item.key, value)
          // console.log(child.type, values[item.key])
          // console.log(child.type.displayName)
          // console.log('child.type TextArea ', child.type === Input.TextArea);
          // console.log(child.type.name === DatePicker.name, 'is DatePicker?')
          switch (true) {
            case child.type === DatePicker || child.type === TimePicker: // Date picker
              // console.log('this a date picker', values[item.key], moment(values[item.key]))
              return React.cloneElement(child, {
                onChange: (val) => {
                  setValues((a) => ({ ...a, [item.key]: val ? new Date(val).toISOString() : null }))
                },
                // onChange: React.useCallback((val) => {
                //   setValues((a) => ({ ...a, [item.key]: val ? new Date(val).toISOString() : null }))
                // }),
                value: value ? moment(value) : null,
              })
            case child.type === Editor:
              return React.cloneElement(child, {
                onChange: (val) => {
                  setValues((a) => ({ ...a, [item.key]: val }))
                },
                value,
                editorHtml: value || '',
              })

            case child.type === Input || child.type === Input.TextArea:
              // console.log('this is input will return', item.key, value)
              return React.cloneElement(child, {
                onChange: React.useCallback((e) => {
                  // console.log(child, val, child.type)
                  setValues((a) => ({ ...a, [item.key]: e.target.value }))
                }, []),
                value,
              })
            case child.type === Checkbox:
              // console.log('this is input will return', item.key, value)
              return React.cloneElement(child, {
                onChange: React.useCallback((e) => {
                  // console.log(child, val, child.type)
                  setValues((a) => ({ ...a, [item.key]: e.target.checked }))
                }),
                value,
              })
            default:
              if (value === 'true') value = true
              if (value === 'false') value = false
              return React.cloneElement(child, {
                onChange: (val) => {
                  let setVal = val
                  if (val.target) setVal = val.target.value
                  setValues((a) => ({ ...a, [item.key]: setVal }))
                },
                // onChange: React.useCallback((val) => {
                //   let setVal = val
                //   if (val.target) setVal = val.target.value
                //   setValues((a) => ({ ...a, [item.key]: setVal }))
                // }),
                value,
              })
          }
        }

        return (
          <AntdForm.Item
            className={item.className || ''}
            key={item.key}
            label={item.label}
            validateStatus={errors[item.key] && 'error'}
            help={errors[item.key]}
          >
            {item.type ? injectPropsIntoChild() : null}
          </AntdForm.Item>
        )
      })}

      <AntdForm.Item {...tailFormItemLayout}>
        {onCancel && (
          <Button type="dashed" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onSubmitForm && (
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </AntdForm.Item>
    </AntdForm>
  )
}

// if exporting, import named in componnet
Form.Provider = ({ initialValues, schema, onSubmit: submitForm, children }) => {
  const handleSubmit = async () => {
    formAttributes.setSubmitting(true)
    await submitForm(formAttributes.values)
    formAttributes.setSubmitting(false)
  }

  React.useEffect(() => {
    console.log('initialValues changed', initialValues)
  }, [initialValues])

  // const {
  //   onChange,
  //   values,
  //   setValues,
  //   onSubmit,
  //   onBlur,
  //   errors,
  //   setSubmitting,
  //   isSubmitting,
  //   // validateForm,
  //   // touched,
  //   // setTouched,
  // } = useFormValidation(initialValues, schema, handleSubmit, true)

  const formAttributes = useFormValidation(initialValues, schema, handleSubmit, true)

  return <FormProvider value={{ ...formAttributes }}>{children}</FormProvider>
}

Form.Consumer = ({ children }) => {
  const context = React.useContext(FormContext)
  // console.log(context)
  return children(context)
}

const propTypes = {
  className: PropTypes.string,
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
  className: '',
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

Form.Provider.displayName = 'Form.Provider'
Form.Consumer.displayName = 'Form.Consumer'

Form.propTypes = propTypes
Form.defaultProps = defaultProps
Form.Provider.defaultProps = defaultProps

Form.Provider.propTypes = {
  ...omit(propTypes, ['formItemLayout', 'tailFormItemLayout', 'formItems']),
}
Form.Provider.defaultProps = {
  ...omit(defaultProps, ['formItemLayout', 'tailFormItemLayout', 'formItems']),
}

Form.displayName = 'Form'
export default Form
