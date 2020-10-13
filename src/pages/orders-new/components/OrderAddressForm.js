import React, { useEffect } from 'react'
import Form from 'components/Form'
import { Input } from 'antd'
import { orderAddressSchema } from 'utils/Schema'

const OrderAddressForm = ({ onSubmit, initialValues }) => {
  // houseNo
  // street
  // landmark
  // city
  // state
  // pincode
  console.log('formInitValues', initialValues)
  useEffect(() => {
    console.log('formInitValues changed', initialValues)
  }, [initialValues])
  const formItems = [
    {
      type: <Input name="houseNo" />,
      key: 'houseNo',
      label: 'House No',
    },
    {
      type: <Input name="street" />,
      key: 'street',
      label: 'Street',
    },
    {
      type: <Input name="landmark" />,
      key: 'landmark',
      label: 'Landmark',
    },
    {
      type: <Input name="city" />,
      key: 'city',
      label: 'City',
    },
    {
      type: <Input name="state" />,
      key: 'state',
      label: 'State',
    },
    {
      type: <Input name="pincode" />,
      key: 'pincode',
      label: 'Pincode',
    },
  ]
  return (
    <Form
      formItems={formItems}
      initialValues={initialValues}
      onSubmit={onSubmit}
      schema={orderAddressSchema}
    />
  )
}

export default OrderAddressForm
