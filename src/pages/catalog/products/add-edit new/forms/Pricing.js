/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Input, DatePicker, Select } from 'antd'

// import { disabledDate } from 'utils'
// import moment from 'moment'
import { getTaxClasses } from 'services'
import PropTypes from 'prop-types'
import Form from 'components/Form'

const widthStyle = { width: 300 }

const dateFormat = 'DD-MM-YYYY'

// const { RangePicker } = DatePicker

// const dropdownStyle = { maxHeight: 400, overflow: 'auto' }

// const widthStyle = { width: 300 }

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const DPricing = ({ initialValues, schema, onSubmit, title }) => {
  const [taxClasses, setTaxClasses] = useState([])

  useEffect(() => {
    const fetchTaxClasses = async () => {
      const cData = await getTaxClasses()
      if (cData) setTaxClasses(cData)
    }

    fetchTaxClasses()
  }, [])

  // const onChangeStartDate = a =>
  //   setValues(prev => ({ ...prev, startDate: new Date(a).toISOString() }))
  // const onChangeEndDate = a => setValues(prev => ({ ...prev, endDate: new Date(a).toISOString() }))

  // const onChangeTaxClass = e => setValues(a => ({ ...a, taxId: e }))

  // const onChangePriorityOrder = e => setValues(a => ({ ...a, priorityOrder: e }))
  const formItems = [
    { heading: title, key: 'title' },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          // value={moment(values.startDate)}
          // onChange={onChangeStartDate}
          // disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'startDate',
      label: 'Start Date',
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          // value={moment(values.endDate)}
          // onChange={onChangeEndDate}
          // disabledDate={disabledDate}
        />
      ),
      key: 'endDate',
      label: 'End Date',
    },
    {
      type: (
        // <>
        //   <span>₹</span>
        <Input name="listPrice" />
        // </>
      ),
      key: 'listPrice',
      label: 'List Price',
    },
    {
      type: (
        // <>
        //   <span>₹</span>
        <Input name="salePrice" />
        // </>
      ),
      key: 'salePrice',
      label: 'Sale Price',
    },
    {
      type: (
        <Select
          showSearch
          style={widthStyle}
          placeholder="Select tax class"
          optionFilterProp="children"
          // onChange={onChangeTaxClass}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {taxClasses.map(i => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'taxId',
      label: 'Tax Class',
    },
  ]

  return (
    <Form initialValues={initialValues} schema={schema} formItems={formItems} onSubmit={onSubmit} />
  )
}

DPricing.propTypes = {
  initialValues: PropTypes.object,
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
}

DPricing.defaultProps = {
  initialValues: {},
  schema: {},
  onSubmit: null,
  title: null,
}

export default DPricing
