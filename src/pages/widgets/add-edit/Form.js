/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import { Input, Radio, DatePicker, InputNumber } from 'antd'
import Form from 'components/Form'
import { widegtSchema } from 'utils/Schema'
import TextArea from 'antd/lib/input/TextArea'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'
import moment from 'moment'

const dateFormat = 'DD-MM-YYYY'

const WidgetEditForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState({
    // startDate: moment().format(moment.now, dateFormat),
    // endDate: moment().format(moment.now, dateFormat),
  })

  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return { status: 'active', ...values }
  }, [initialValues])

  const onChangeStartDate = (a) => {
    setValues((prev) => ({ ...prev, startDate: moment(a).format(dateFormat) }))
  }
  const onChangeEndDate = (a) => {
    setValues((prev) => ({ ...prev, endDate: moment(a).format(dateFormat) }))
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  }
  const formItems = [
    {
      type: <Input />,
      key: 'title',
      label: 'Title',
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          showToday
          value={moment(values.startDate)}
          onChange={onChangeStartDate}
          disabledDate={disabledDate}
        />
      ),
      key: 'startDate',
      label: 'Start Date',
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          showToday
          value={moment(values.endDate)}
          onChange={onChangeEndDate}
          disabledDate={disabledDate}
        />
      ),
      key: 'endDate',
      label: 'End Date',
    },
    {
      type: <InputNumber type="number" min={0} />,
      key: 'diplayOrder',
      label: 'Diplay Order',
    },
    {
      type: <TextArea />,
      key: 'discription',
      label: 'Discription',
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
      schema={widegtSchema}
      onSubmit={onSubmit}
    />
  )
}

export default WidgetEditForm
