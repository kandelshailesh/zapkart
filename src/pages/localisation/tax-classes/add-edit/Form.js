/* eslint-disable no-underscore-dangle */
import React, { useMemo, useEffect, useState } from 'react'
import { Input, Radio, Select } from 'antd'
import Form from 'components/Form'
import { taxClassSchema } from 'utils/Schema'
import useFetching from 'hooks/useFetchingNoReducers'
import { CATALOG_API_URL } from '_constants'

const TaxClassEditForm = ({ initialValues, onSubmit }) => {
  const [taxRates, settaxRates] = useState([])

  const [{ response: taxRateRes }] = useFetching(CATALOG_API_URL.taxRate)

  useEffect(() => {
    if (taxRateRes?.data) settaxRates(taxRateRes?.data)
  }, [taxRateRes])

  const initialVals = useMemo(() => {
    if (initialValues) {
      return { ...initialValues }
    }
    return { status: 'active' }
  }, [initialValues])
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
      type: (
        <Select
          mode="tags"
          placeholder="Select tax rate"
        >
          {taxRates?.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {`${i.name} - ${i.type === '%' ? `${i.rate}%` : `₹${i.rate}`}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'taxes',
      label: 'Tax Rate',
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={taxClassSchema}
      onSubmit={onSubmit}
    />
  )
}

export default TaxClassEditForm
