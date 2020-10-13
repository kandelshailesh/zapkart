import React from 'react'
import {
  Form,
  Input
  // Select
} from 'antd'

// const { Option } = Select

const GeneralForm = Form.create({
  name: 'global_state',
  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields (props) {
    console.log(props)
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
      }),
      email: Form.createFormField({
        ...props.email,
        value: props.email.value
      }),
      phoneno: Form.createFormField({
        ...props.phoneno,
        value: props.phoneno.value
      })
    }
  },
  onValuesChange (_, values) {
    console.log(values)
  }
})(props => {
  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }
  return (
    <Form {...formItemLayout}>
      <Form.Item label='Name'>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: 'Name required'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Email'>
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Email required'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Phone no'>
        {getFieldDecorator('phoneno', {
          rules: [
            {
              required: true,
              message: 'Phone number required'
            }
          ]
        })(<Input />)}
      </Form.Item>
    </Form>
  )
})

export default GeneralForm
