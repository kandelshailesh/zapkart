/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Select, Input, Radio } from 'antd'
import Form from 'components/Form'
import { AddressSchema } from 'utils/Schema'

const addressTypeOptions = [
  {
    value: 'home',
    label: 'Home',
  },
  {
    value: 'office',
    label: 'Office',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

const AddressForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return {}
  }, [initialValues])

  const formItems = [
    {
      key: 'address_type',
      label: 'Address Type',
      type: (
        <Select placeholder="Select Address Type">
          {addressTypeOptions.map((i) => (
            <Select.Option key={i.value} value={i.value}>
              {`${i.label}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="hold">Hold</Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },

    {
      key: 'fullName',
      label: 'Full Name',
      type: <Input />,
    },
    {
      key: 'mobileNo',
      label: 'Mobile',
      type: <Input min={0} />,
    },
    {
      key: 'state',
      label: 'State',
      type: <Input />,
    },
    {
      key: 'city',
      label: 'City',
      type: <Input />,
    },
    {
      key: 'pincode',
      label: 'Pincode',
      type: <Input />,
    },
    {
      key: 'houseNo',
      label: 'House No',
      type: <Input />,
    },
    {
      key: 'street',
      label: 'Street',
      type: <Input />,
    },

    {
      key: 'landmark',
      label: 'LandMark',
      type: <Input />,
    },
    {
      key: 'latitude',
      label: 'Latitude',
      type: <Input />,
    },
    {
      key: 'longitude',
      label: 'Longitude',
      type: <Input />,
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={AddressSchema}
      onSubmit={onSubmit}
    />
  )
}

export default AddressForm
