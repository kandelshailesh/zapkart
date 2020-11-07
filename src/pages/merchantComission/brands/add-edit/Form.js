/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, useEffect } from 'react'
import { Input, Radio, Select } from 'antd'
import Form from 'components/Form'
import { zoneSchema } from 'utils/Schema'
import { CATALOG_API_URL } from '_constants'
import useFetching from 'hooks/useFetching'

const ZoneEditForm = ({ initialValues, onSubmit }) => {
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [selectSate, setSetetedSate] = useState([])

  const [{ response: countries }] = useFetching(CATALOG_API_URL.country)
  const [{ response: states }] = useFetching(CATALOG_API_URL.state)

  useEffect(() => {
    if (countries?.data) {
      setCountryList(countries?.data)
    }

    if (states?.data) {
      setStateList(states?.data)
    }
    if (initialValues?.zones) {
      setSetetedSate(stateList)
    }
  }, [countries, states, initialValues, stateList])

  const initialVals = useMemo(() => {
    if (initialValues) {
      const value = {
        pincodes: initialValues?.pincodes?.join(', '),
        country: initialValues?.country,
        state: initialValues?.state?._id,
      }
      return { ...initialValues, ...value }
    }
    return { status: 'active' }
  }, [initialValues, stateList])

  const handleChange = (values) => {
    if (values.country) {
      if (stateList) {
        setSetetedSate(mapSatateToCountry(stateList, values?.country))
      }
    }
  }
  const mapSatateToCountry = (stList, countryID) => {
    const countryWiseState = []
    const data = stList
    Object.keys(data).forEach((i) => {
      if (data[i].country._id === countryID) {
        countryWiseState.push(data[i])
      }
    })
    return countryWiseState
  }

  const formItems = [
    {
      type: <Input />,
      key: 'name',
      label: 'Zone Name',
    },
    {
      key: 'country',
      label: 'Country',
      type: (
        <Select placeholder="Select Country first">
          {countryList?.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {`${i.country}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      key: 'state',
      label: 'State',
      type: (
        <Select placeholder="Select State first">
          {selectSate?.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {`${i.state}`}
            </Select.Option>
          ))}
        </Select>
      ),
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
      type: <Input.TextArea placeholder="Enter pincodes seperated by commas" />,
      key: 'pincodes',
      label: 'Pincodes',
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={zoneSchema}
      onSubmit={onSubmit}
      onChange={handleChange}
    />
  )
}

export default ZoneEditForm
