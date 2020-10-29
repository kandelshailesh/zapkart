/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react'
import { Button, Form, Input, Select } from 'antd'
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
const widthStyle = { width: 300 }
// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AAccount = ({ hideSubmit, hasTitle, formControls }) => {
  // const [medicineTypes, setMedicineTypes] = useState([])

  console.log('formControls', formControls)
  const formContext = useContext(FormContext)
  const onChangeAccountType = e => setValues(a => ({ ...a, accounttype: e }))
  const {
    onChange,
    values,
    setValues,
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
    { heading: hasTitle ? 'Account Details' : undefined },

    {
      type: (
        <Select
          // labelInValue
          defaultValue={values.accounttype}
          showSearch
          style={widthStyle}
          placeholder="Select Account Type"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeAccountType}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option key="saving" value="Saving">
            Saving
          </Select.Option>
          <Select.Option key="current" value="Current">
            Current
          </Select.Option>
        </Select>
      ),
      key: 'accounttype',
      label: 'Account Type',
      error: errors.accounttypeId,
    },
    {
      type: <Input value={values.nameonaccount} name="nameonaccount" />,
      key: 'nameonaccount',
      label: 'Name on Account',
      error: errors.nameonaccount,
    },
    {
      type: <Input.TextArea value={values.accountdetails} name="accountdetails" />,
      key: 'accountdetails',
      label: 'Account Details',
      error: errors.accountdetails,
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

AAccount.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

AAccount.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default AAccount
