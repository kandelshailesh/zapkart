/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio, Select } from 'antd'
import Form from 'components/Form'
import { stateSchema } from 'utils/Schema'
import useFetching from 'hooks/useFetchingNoReducers'
import { CATALOG_API_URL } from '_constants'

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues, country: initialValues.country._id }
    return { status: 'active' }
  }, [initialValues])

  const [{ response: countryList }] = useFetching(CATALOG_API_URL.country)

  const formItems = [
    {
      key: 'country',
      label: 'country',
      type: (
        <Select placeholder="Select Country first">
          {countryList?.data?.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {`${i.country}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      type: <Input />,
      key: 'state',
      label: 'state',
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
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={stateSchema}
      onSubmit={onSubmit}
    />
  )
}

export default CountryEditForm
