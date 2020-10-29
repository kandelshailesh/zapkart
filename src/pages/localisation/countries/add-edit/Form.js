/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio } from 'antd'
import Form from 'components/Form'
import { countrySchema } from 'utils/Schema'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return { status: 'active' }
  }, [initialValues])

  const formItems = [
    {
      type: <Input />,
      key: 'country',
      label: 'country',
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
      schema={countrySchema}
      onSubmit={onSubmit}
    />
  )
}

export default CountryEditForm
