/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio, // DatePicker
  Select,
} from 'antd'

// import { disabledDate } from 'utils'
// import moment from 'moment'
import { getTaxClasses } from 'services'
import PropTypes from 'prop-types'
import { FormContext } from '../tabs'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const widthStyle = { width: 300 }

// const dateFormat = 'DD-MM-YYYY'

// const { RangePicker } = DatePicker

// const dropdownStyle = { maxHeight: 400, overflow: 'auto' }

// const widthStyle = { width: 300 }

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const DPricing = ({ data, hideSubmit, hasTitle, formControls }) => {
  console.log(data)
  const [taxClasses, setTaxClasses] = useState([])

  const formContext = React.useContext(FormContext)

  // const initialValues = data || {
  //   startDate: '2020-01-15T05:06:37.163Z',
  //   endDate: '2020-01-15T05:06:37.163Z',
  // }

  useEffect(() => {
    const fetchTaxClasses = async () => {
      const cData = await getTaxClasses()
      if (cData) setTaxClasses(cData)
    }

    fetchTaxClasses()
  }, [])

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,

    // validateForm,
  } = formControls || formContext

  console.log('values', values)

  // const onDateChange = a => {
  //   console.log(a)
  //   setValues(m => ({
  //     ...m,
  //     startDate: new Date(a[0]).toISOString(),
  //     endDate: new Date(a[1]).toISOString(),
  //   }))
  // }

  // const onDateOk = a => {
  //   console.log('onOk', a)
  // }

  // const onChangeStartDate = a =>
  //   setValues(prev => ({ ...prev, startDate: new Date(a).toISOString() }))
  // const onChangeEndDate = a => setValues(prev => ({ ...prev, endDate: new Date(a).toISOString() }))

  const onChangeTaxClass = (e) => setValues((a) => ({ ...a, taxId: e }))

  // const onChangePriorityOrder = e => setValues(a => ({ ...a, priorityOrder: e }))
  const formItems = [
    { heading: hasTitle ? 'Pricing' : undefined },

    // {
    //   type: (
    //     <RangePicker
    //       showToday
    //       ranges={{
    //         Today: [moment(), moment()],
    //         'This Month': [moment().startOf('month'), moment().endOf('month')],
    //       }}
    //       disabledDate={disabledDate}
    //       placeholder={['Start date', 'End date']}
    //       value={[moment(values.startDate, dateFormat), moment(values.endDate, dateFormat)]}
    //       onChange={onDateChange}
    //       onOk={onDateOk}
    //     />
    //   ),
    //   key: 'a',
    //   label: 'Date',
    //   error: errors.startDate && errors.endDate,
    // },
    // {
    //   type: (
    //     <DatePicker
    //       format={dateFormat}
    //       allowClear={false}
    //       showToday
    //       value={moment(values.startDate)}
    //       onChange={onChangeStartDate}
    //       // disabledDate={data ? null : disabledDate}
    //     />
    //   ),
    //   key: 'startDate',
    //   label: 'Start Date',
    //   error: errors.startDate,
    // },
    // {
    //   type: (
    //     <DatePicker
    //       format={dateFormat}
    //       allowClear={false}
    //       showToday
    //       value={moment(values.endDate)}
    //       onChange={onChangeEndDate}
    //       // disabledDate={disabledDate}
    //     />
    //   ),
    //   key: 'endDate',
    //   label: 'End Date',
    //   error: errors.endDate,
    // },
    {
      type: (
        // <>
        //   <span>₹</span>
        <Input value={values.listPrice} name="listPrice" />
        // </>
      ),
      key: 'listPrice',
      label: 'List Price',
      error: errors.listPrice,
      dependency: 'linktoBase',
    },
    {
      type: (
        <span>
          <InputNumber value={values.saleCommision} name="saleCommision" type="number" /> %
        </span>
      ),
      key: 'saleCommision',
      label: 'Sale Commision',
      error: errors.saleCommision,
    },
    {
      type: (
        // <>
        //   <span>₹</span>
        <Input value={values.salePrice} name="salePrice" />
        // </>
      ),
      key: 'salePrice',
      label: 'Sale Price',
      error: errors.salePrice,
    },
    {
      type: (
        <Select
          value={values.taxId}
          showSearch
          style={widthStyle}
          placeholder="Select tax class"
          optionFilterProp="children"
          onChange={onChangeTaxClass}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {taxClasses.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'taxId',
      label: 'Tax Class',
      error: errors.taxId,
    },
    {
      type: (
        <Radio.Group
          name="price_include_tax"
          defaultValue={values.price_include_tax}
          buttonStyle="solid"
        >
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      ),
      key: 'price_include_tax',
      label: 'Price Include Tax',
      error: errors.price_include_tax,
    },
  ]

  return (
    <>
      <Form
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
        {...formItemLayout}
      >
        {formItems.map((item) => {
          if (item.heading)
            return (
              <h4 key={item.heading} className="text-black mb-3">
                <strong>{item.heading}</strong>
              </h4>
            )

          if (item.dependency && item.dependency === 'linktoBase') {
            if (
              values[item.dependency] === 'false' ||
              values[item.dependency] === false ||
              item.render === true
            ) {
              console.log(values[item.dependency], typeof values[item.dependency])
              return (
                <Form.Item
                  key={item.key}
                  label={item.label}
                  validateStatus={item.error && 'error'}
                  help={item.error}
                >
                  {item.type}
                </Form.Item>
              )
            }
            return null
          }

          return (
            <Form.Item
              key={item.key}
              label={item.label}
              validateStatus={item.error && 'error'}
              help={item.error}
            >
              {item.type}
            </Form.Item>
          )
        })}
        {!hideSubmit && (
          <Form.Item>
            <Button
              disabled={isSubmitting}
              // style={{ visibility: 'hidden' }}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  )
}

DPricing.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

DPricing.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default DPricing
