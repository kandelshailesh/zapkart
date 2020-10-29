/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Form,
  Radio,
  Button,
  // Row, Col,
  Input,
  // Switch
} from 'antd'

const FormItem = Form.Item
// const { TreeNode } = TreeSelect
// const { Option } = Select

const MerchantTypeForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    console.log(changedFields)
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    console.log('gggggggggggg', props)
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value,
      }),
    }
  },
  onValuesChange(_, values) {
    console.log(values)
  },
})(props => {
  const { form, onSubmit, onReset } = props
  const {
    getFieldDecorator,
    validateFieldsAndScroll,

    // getFieldValue
  } = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }
  return (
    <Form
      {...formItemLayout}
      onSubmit={e => {
        validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            onSubmit(e)
          }
        })
      }}
    >
      {/* <div className="column"> */}
      <FormItem label="MerchantType Name">
        {getFieldDecorator('name', {
          // initialValue: category.name,
        })(<Input placeholder="title" />)}
      </FormItem>
      <FormItem label="Status">
        {getFieldDecorator('status')(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="hold">Hold</Radio.Button>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem>
        <div className="row">
          <div className="col-lg-12">
            <Button type="primary" htmlType="submit" className="btn-margins">
              Save
            </Button>
            <Button type="ghost" onClick={() => onReset()} className="btn-margins">
              Reset
            </Button>
          </div>
        </div>
      </FormItem>
      {/* </div> */}
    </Form>
  )
})

export default MerchantTypeForm
