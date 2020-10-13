import React from 'react'
import { Input, Select, Checkbox } from 'antd'
import Form from 'components/Form'
import { orderFormSchema } from 'utils/Schema'
import CardWrapper from 'components/CardWrapper'

const formItemLayout = {
  labelCol: {
    // xs: { span: 24 },
    sm: { span: 5 },
    // lg: { span: 12 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    sm: { span: 12 },
    // lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const paymentStatusOptions = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
  {
    value: 'success',
    label: 'Success',
  },
  {
    value: 'noChange',
    label: 'No change',
  },
]

const orderStatusOptions = [
  {
    value: 'hold',
    label: 'Hold',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'processing',
    label: 'Processing',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'noChange',
    label: 'No change',
  },
]

const OrderStatusForm = ({ onSubmit, initialValues, title }) => {
  const formItems = [
    {
      type: <Input disabled />,
      key: 'paymentSettingId',
      label: 'Payment method',
    },
    {
      type: (
        <Select>
          {paymentStatusOptions.map(i => (
            <Select.Option key={i.value} value={i.value}>
              {i.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'paymentStatus',
      label: 'Current Payment status',
    },
    {
      type: (
        <Select>
          {orderStatusOptions.map(i => (
            <Select.Option key={i.value} value={i.value}>
              {i.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'orderStatus',
      label: 'Current Order status',
    },
    {
      type: <Input.TextArea rows={4} />,
      key: 'comment',
      label: 'Comment',
    },
    {
      type: <Checkbox />,
      key: 'notifyCustomer',
      label: 'Notify customer',
    },
  ]

  return (
    <CardWrapper title={title}>
      <Form
        formItems={formItems}
        schema={orderFormSchema}
        initialValues={initialValues}
        formItemLayout={formItemLayout}
        onSubmit={onSubmit}
      />
    </CardWrapper>
  )
}

export default OrderStatusForm
