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
      address: Form.createFormField({
        ...props.address,
        value: props.address.value
      }),
      pincode: Form.createFormField({
        ...props.pincode,
        value: props.pincode.value
      }),
      city: Form.createFormField({
        ...props.city,
        value: props.city.value
      }),
      state: Form.createFormField({
        ...props.state,
        value: props.state.value
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
      <Form.Item label='Address'>
        {getFieldDecorator('address', {
          rules: [
            {
              required: true,
              message: 'Address required'
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
      <Form.Item label='Pincode'>
        {getFieldDecorator('pincode', {
          rules: [
            {
              required: true,
              message: 'Pincode required'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='City'>
        {getFieldDecorator('city', {
          rules: [
            {
              required: true,
              message: 'City required'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='State'>
        {getFieldDecorator('state', {
          rules: [
            {
              required: true,
              message: 'State required'
            }
          ]
        })(<Input />)}
      </Form.Item>
    </Form>
  )
})

export default GeneralForm
