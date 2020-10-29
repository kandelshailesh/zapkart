/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Select, notification, DatePicker } from 'antd'
import { coupenSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout, disabledDate } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { getCoupenSection, addCoupens } from 'services/coupens'
import moment from 'moment'
import InfiniteDropbox from 'components/infinite-scroll'
import { getActiveUserPagination, getuserGroup } from 'services/usergroups'
import { STRINGS, LINKS, ROLES } from '_constants'

const FormA = ({ data }) => {
  const [coupensection, setCoupensection] = useState([])
  const [userGroup, setUserGroup] = useState([])
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
  }

  useEffect(() => {
    const fetchCoupensection = async () => {
      const cData = await getCoupenSection()
      console.log('777', cData)
      if (cData) setCoupensection(cData.data)
      console.log('888', coupensection)
    }

    const fetchUserGroup = async () => {
      const cdata = await getuserGroup(ROLES.enduser)
      if (cdata) setUserGroup(cdata)
    }
    fetchUserGroup()
    fetchCoupensection()
  }, [])

  useEffect(() => {
    if (data) {
      setValues({
        ...data,
      })
      console.log(initialValues)
    }
  }, [data])

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    const a = data
      ? await getCoupenSection(data._id, values, data)
      : await addCoupens({ ...values })
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }
  const widthStyle = { width: 300 }
  console.log(initialValues)
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(initialValues, coupenSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log('uuuu', values)
  const dateFormat = 'DD-MM-YYYY'
  const onChangeStartDate = a =>
    setValues(prev => ({ ...prev, validFrom: new Date(a).toISOString().slice(0, 10) }))
  const onChangeEndDate = a =>
    setValues(prev => ({ ...prev, validTo: new Date(a).toISOString().slice(0, 10) }))
  const onChangeCoupenSection = e => setValues(a => ({ ...a, coupenTypeId: e }))
  const onChangeValueInfiniteScrollHandler = val => {
    setValues(a => ({ ...a, userData: JSON.stringify(val) }))
  }
  const onChangeUserGroup = val => {
    setValues(a => ({ ...a, userGroupData: val }))
  }

  const formItems = [
    { heading: '' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: <Input value={values.coupenCode} name="coupenCode" />,
      key: 'coupenCode',
      label: 'Coupen Code',
      error: errors.coupenCode,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          value={moment(values.validFrom)}
          onChange={onChangeStartDate}
          disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'validFrom',
      label: 'Start Date',
      error: errors.validFrom,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          value={moment(values.validTo)}
          onChange={onChangeEndDate}
          disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'validTo',
      label: 'End Date',
      error: errors.validTo,
    },
    {
      type: (
        <Select
          // labelInValue
          defaultValue={[values.coupenTypeId]}
          showSearch
          style={widthStyle}
          placeholder="Select Coupen section"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeCoupenSection}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {coupensection.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'coupensection',
      label: 'Coupen Section',
      error: errors.coupensection,
    },
    {
      type: (
        <Select
          // labelInValue
          mode="multiple"
          defaultValue={[]}
          showSearch
          style={widthStyle}
          placeholder="Select User Group"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeUserGroup}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {userGroup.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'usergroup',
      label: 'User Group',
    },
    {
      type: (
        <InfiniteDropbox
          pageSize={5}
          optionData={getActiveUserPagination}
          onChange={onChangeValueInfiniteScrollHandler}
        />
      ),
      key: 'userData',
      label: 'User',
    },
  ]

  if (success) return <Redirect to={LINKS.coupens} />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map(item => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
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
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
