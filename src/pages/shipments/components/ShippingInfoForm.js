import React from 'react'

import Form from 'components/Form'

import { Input, Select } from 'antd'

const dropOffOptions = [
  {
    value: 'request-courier',
    label: 'Request courier',
  },
  {
    value: 'regular-pickup',
    label: 'Regular pickup',
  },
  {
    value: 'dropoff-station',
    label: 'Drop off at station',
  },
]

const shippingStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'dispatched', label: 'Dispatched' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'cancelled', label: 'Cancelled' },
]

const ShippingInfoForm = ({ formItemLayout }) => {
  const shippingDetailsFI = [
    {
      type: (
        <Select>
          {shippingStatusOptions.map(i => (
            <Select.Option key={i.value} value={i.value}>
              {i.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'shippingStatus',
      label: 'Shipping Status',
    },
    { type: <Input />, key: 'grossWeight', label: 'Gross Weight (in pounds)' },
    { type: <Input />, key: 'otherLogisticPartner', label: 'Logistic Partner' },
    { type: <Input />, key: 'otherTrackingUrl', label: 'Tracking URL' },
    { type: <Input />, key: 'packageDetails', label: 'PackageDetails' },
    {
      type: (
        <Select>
          {dropOffOptions.map(i => (
            <Select.Option key={i.value} value={i.value}>
              {i.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'dropOffType',
      label: 'Drop Off Type',
    },
    { type: <Input.TextArea />, key: 'comment', label: 'Comment' },
    { type: <Input />, key: 'trackingNumber', label: 'TrackingNumber' },
  ]

  return <Form formItems={shippingDetailsFI} formItemLayout={formItemLayout} />
}

export default ShippingInfoForm
