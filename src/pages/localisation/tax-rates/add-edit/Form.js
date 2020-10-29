/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio, InputNumber, Select } from 'antd'
import Form from 'components/Form'
import { taxRateSchema } from 'utils/Schema'
import useFetching from 'hooks/useFetchingNoReducers'
import { CATALOG_API_URL } from '_constants'

const typeOptions = [
  {
    value: '%',
    name: 'Percentage',
  },
  {
    value: 'value',
    name: 'Value',
  },
]

const ZoneEditForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return initialValues
    return { status: 'active' }
  }, [initialValues])

  const [{ response: geoZone }] = useFetching(CATALOG_API_URL.geoZone)

  const formItems = [
    {
      type: <Input />,
      key: 'name',
      label: 'Name',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value="active">
            Active
          </Radio.Button>
          <Radio.Button key="hold" value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: <InputNumber type="number" min={0} />,
      key: 'rate',
      label: 'rate',
    },
    {
      type: (
        <Select placeholder="Select type">
          {typeOptions.map((i) => (
            <Select.Option key={i.value} value={i.value}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'type',
      label: 'Type',
    },
    {
      type: (
        <Select mode="default" placeholder="Select zone">
          {geoZone?.data?.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'geozone',
      label: 'Geozone',
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={taxRateSchema}
      onSubmit={onSubmit}
    />
  )
}

export default ZoneEditForm
