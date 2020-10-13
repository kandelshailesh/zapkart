import React from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

const GeneralForm = Form.create({
  name: 'global_state',
  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields (props) {
    console.log(props)
    console.log(props.name)
    console.log(props.name.value)
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
      }),
      gender: Form.createFormField({
        ...props.gender,
        value: props.gender.value
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value
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
            },
            {
              /* {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              validator: this.compareToFirstPassword
            } */
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Gender'>
        {getFieldDecorator('gender', {
          rules: [
            {
              required: true,
              message: 'Gender required'
            }
          ]
        })(
          <Select>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='Email'>
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Name required'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Phone No'>
        {getFieldDecorator('phoneno', {
          rules: [
            {
              required: true,
              message: 'Phone no required'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Status'>
        {getFieldDecorator('status')(
          <Select>
            <Option value='active'>Active</Option>
            <Option value='disabled'>Disabled</Option>
          </Select>
        )}
      </Form.Item>
    </Form>
  )
})

export default GeneralForm
