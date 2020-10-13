/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Form, Button, DatePicker, Select, Icon, Input, Skeleton, Switch } from 'antd'

const { Option } = Select
const FormItem = Form.Item

const typeValues = [
  {
    value: 'percentage',
    name: 'Percentage',
  },
  {
    value: 'fixedAmount',
    name: 'Fixed amount',
  },
]

const status = [
  {
    value: 'enabled',
    name: 'Enabled',
  },
  {
    value: 'disabled',
    name: 'Disabled',
  },
]

const productOptions = list => {
  console.log(list)
  return list.map(item => <Option key={item.product._id}>{item.product.name}</Option>)
}

const OfferForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    console.log(changedFields)
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    console.log(props)
    return {
      couponName: Form.createFormField({
        ...props.couponName,
        value: props.couponName.value,
      }),
      code: Form.createFormField({
        ...props.code,
        value: props.code.value,
      }),
      type: Form.createFormField({
        ...props.type,
        value: props.type.value,
      }),
      discount: Form.createFormField({
        ...props.discount,
        value: props.discount.value,
      }),
      totalAmount: Form.createFormField({
        ...props.totalAmount,
        value: props.totalAmount.value,
      }),
      customerLogin: Form.createFormField({
        ...props.customerLogin,
        value: props.customerLogin.value,
      }),
      freeShipping: Form.createFormField({
        ...props.freeShipping,
        value: props.freeShipping.value,
      }),
      products: Form.createFormField({
        ...props.products,
        value: props.products.value,
      }),
      categories: Form.createFormField({
        ...props.categories,
        value: props.categories.value,
      }),
      startDate: Form.createFormField({
        ...props.startDate,
        value: props.startDate.value,
      }),
      endDate: Form.createFormField({
        ...props.endDate,
        value: props.endDate.value,
      }),
      usesPerCoupon: Form.createFormField({
        ...props.usesPerCoupon,
        value: props.usesPerCoupon.value,
      }),
      usesPerCustomer: Form.createFormField({
        ...props.usesPerCustomer,
        value: props.usesPerCustomer.value,
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
  const { onSubmit, onReset } = props
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  const {
    getFieldDecorator,
    // getFieldValue,
    validateFieldsAndScroll,
    // getFieldValue
  } = props.form
  const { productsList } = props
  console.log(props)

  const typeOptions = typeValues.map(item => <Option key={item.value}>{item.name}</Option>)
  const statusOptions = status.map(item => <Option key={item.value}>{item.name}</Option>)

  // Input placeholder="Product name" className="form-control"

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
      <FormItem label="Coupon Name">
        {getFieldDecorator('couponName', {
          rules: [{ required: true, message: 'Coupon name required' }],
        })(<Input placeholder="Coupon name" className="form-control" />)}
      </FormItem>

      <FormItem label="Code">
        {getFieldDecorator('code', {
          rules: [{ required: true, message: 'Code required' }],
        })(<Input placeholder="Code" className="form-control" />)}
      </FormItem>

      <FormItem label="Type">
        {getFieldDecorator('type', {
          rules: [{ required: true, message: 'Type required' }],
        })(
          <Select id="type" placeholder="Select type">
            {typeOptions}
          </Select>,
        )}
      </FormItem>

      <FormItem label="Discount">
        {getFieldDecorator('discount')(<Input placeholder="Discount" />)}
      </FormItem>

      <FormItem label="Total amount">
        {getFieldDecorator('totalAmount')(<Input placeholder="Total amount" />)}
      </FormItem>

      <FormItem label="Customer login">
        {getFieldDecorator('customerLogin', {
          valuePropName: 'checked',
        })(
          <Switch
            // disabled={record.status === 'inactive'}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />,
        )}
      </FormItem>

      <FormItem label="Free shipping">
        {getFieldDecorator('freeShipping', {
          valuePropName: 'checked',
        })(
          <Switch
            // disabled={record.status === 'inactive'}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />,
        )}
      </FormItem>

      <FormItem label="Products">
        {!productsList && <Skeleton paragraph={false} active />}
        {productsList &&
          getFieldDecorator('products')(
            <Select mode="tags">{productOptions(productsList)}</Select>,
          )}
      </FormItem>

      <FormItem label="Categories">
        {getFieldDecorator('categories')(
          <Select mode="tags">
            <Option key="hi" value="hi" />
          </Select>,
        )}
      </FormItem>

      <FormItem label="Start Date">
        {getFieldDecorator('startDate', {
          rules: [{ type: 'object', required: true, message: 'Please select date!' }],
        })(<DatePicker />)}
      </FormItem>

      <FormItem label="End Date">
        {getFieldDecorator('endDate', {
          rules: [{ type: 'object', required: true, message: 'Please select date!' }],
        })(<DatePicker />)}
      </FormItem>

      <FormItem label="Uses per coupon">
        {getFieldDecorator('usesPerCoupon')(<Input placeholder="Uses per coupon" />)}
      </FormItem>

      <FormItem label="Uses per customer">
        {getFieldDecorator('usesPerCustomer')(<Input placeholder="Uses per customer" />)}
      </FormItem>

      <FormItem label="Status">
        {getFieldDecorator('status')(<Select>{statusOptions}</Select>)}
      </FormItem>

      <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
        <Button type="primary" htmlType="submit" className="btn-margins">
          Save
        </Button>
        <Button
          onClick={onReset}
          type="ghost"
          // onClick
          className="btn-margins"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
})

export default OfferForm
