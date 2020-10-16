/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio, Select } from 'antd'
import Form from 'components/Form'
import { customAttrubitesSchema } from 'utils/Schema'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'
const { Option, OptGroup } = Select

const CustomAttributes = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return { status: 'active' }
  }, [initialValues])

  const formItems = [
    {
      type: <Input />,
      key: 'label',
      label: 'Lebal',
    },
    {
      type: <Input />,
      key: 'code',
      label: 'Code',
    },
    {
      type: (
        <Select defaultValue="lucy">
          <Option value="" selected="selected">
            Select
          </Option>
          <OptGroup label="Text">
            <Option value="textbox">Field</Option>
            <Option value="textarea">Area</Option>
          </OptGroup>
          <OptGroup label="Select">
            <Option value="select">Drop-down</Option>
            <Option value="multiselect">Multiple Select</Option>
          </OptGroup>
          <OptGroup label="Date">
            <Option value="date">Date</Option>
            <Option value="datetime">Date &amp; Time</Option>
            <Option value="time">Time</Option>
          </OptGroup>
          <OptGroup label="File">
            <Option value="file">File</Option>
          </OptGroup>
        </Select>
      ),
      key: 'inputType',
      label: 'Input Type',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="no">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          <Radio.Button key="none" value="none">
            None
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'useInFilter',
      label: 'Use In Filter',
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
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="no">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          <Radio.Button key="none" value="none">
            None
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'comparableOnfrontend',
      label: 'Comparable On Frontend',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="true" value="true">
            True
          </Radio.Button>
          <Radio.Button key="false" value="false">
            False
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'useInRecemondation',
      label: 'Use In Recemondation',
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={customAttrubitesSchema}
      onSubmit={onSubmit}
    />
  )
}

export default CustomAttributes
