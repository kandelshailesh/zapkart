/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react'
import { Button, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { FormContext } from './index'

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

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AContact = ({ hideSubmit, hasTitle, formControls }) => {
  // const [medicineTypes, setMedicineTypes] = useState([])

  console.log('formControls', formControls)
  const formContext = useContext(FormContext)
  console.log('formContext', formContext)
  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    originalData,
    // setSubmitting,
    isSubmitting,
    // data,
  } = formControls || formContext

  console.log('originalData', originalData)

  const formItems = [
    { heading: hasTitle ? 'Contact Details' : undefined },

    {
      type: <Input value={values.firstName} name="firstName" />,
      key: 'firstName',
      label: 'first Name',
      error: errors.firstName,
    },
    {
      type: <Input value={values.lastName} name="lastName" />,
      key: 'lastName',
      label: 'last Name',
      error: errors.lastName,
    },
    {
      type: <Input value={values.email} name="email" />,
      key: 'email',
      label: 'Email',
      error: errors.email,
    },
    {
      type: <Input.Password value={values.password} name="password" />,
      key: 'password',
      label: 'Password',
      error: errors.password,
    },
    {
      type: <Input.Password value={values.passwordConfirmation} name="passwordConfirmation" />,
      key: 'passwordConfirmation',
      label: 'Confirm password',
      error: errors.passwordConfirmation,
    },
  ]

  return (
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
  )
}

AContact.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

AContact.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default AContact
