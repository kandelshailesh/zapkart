/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Input, Radio, Select, notification, DatePicker } from 'antd'
import Form from 'components/Form'
import { coupenSchema } from 'utils/Schema'
import { disabledDate } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import { getCoupenSection, addCoupens, editCoupens } from 'services/coupens'
import InfiniteDropbox from 'components/infinite-scroll'
import { getActiveUserPagination, getuserGroup } from 'services/usergroups'
import { getCategories } from 'services/categories'
import { getProducts } from 'services/products'
import { STRINGS, LINKS, ROLES } from '_constants'

const CoupenForm = ({ data }) => {
  const [coupensection, setCoupensection] = useState([])
  const [userGroup, setUserGroup] = useState([])
  const [offertype, setOfferTypes] = useState('flat')
  const [dataitem, setDataItem] = useState([])

  const { Option } = Select
  const initialValues = {
    status: 'hold',
  }

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    const fetchCoupensection = async () => {
      const cData = await getCoupenSection()
      console.log('777', cData)
      if (cData) setCoupensection(cData.data)
      console.log('888', coupensection)
      console.log('dfg', setOfferTypes)
    }

    const fetchUserGroup = async () => {
      const cdata = await getuserGroup(ROLES.enduser)
      if (cdata) setUserGroup(cdata)
    }
    fetchUserGroup()
    fetchCoupensection()
  }, [])

  useEffect(() => {
    // console.log("234er",data.offer[0]);
    if (data) {
      setValues({
        ...data.offer[0],
        usergroup: data.offeruser
          ? data.offeruser.filter(i => i.mappingType === 'userGroup').map(i => i.userMappingId)
          : [],
        userData: data.offeruser
          ? data.offeruser
              .filter(i => i.mappingType === 'individualUser')
              .map(i => ({ value: i.userMappingId, label: i.label })) // need email of userId to set label
          : [],
        coupenTypeId: data.offerproduct ? 'product' : [],
        offeritem: data.offerproduct
          ? data.offerproduct.map(i => i._id) // need email of userId to set label
          : [],
      })
    }
  }, [data])

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async val => {
    console.log('12121212', data)
    const a = data ? await editCoupens(val.id, val, data) : await addCoupens(val)
    // setSubmitting(false)
    console.log('7777777', a)
    if (a) {
      console.log('fgf')
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }
  let dataitemValue = []
  const sectionChange = async formValues => {
    if (formValues.type) {
      setOfferTypes(formValues.type)
      // formValues.offeritem = []
      // setDataItem([])
    }

    if (formValues.coupenTypeId === 'product') {
      dataitemValue = await getProducts({ fields: ['name', '_id'] })
      setDataItem(dataitemValue)
      // dataitem = dataitemValue;
      console.log('55555', dataitem)
    }

    if (formValues.coupenTypeId === 'category') {
      dataitemValue = await getCategories()
      setDataItem(dataitemValue)
      // dataitem = dataitemValue.data;
      console.log('0000', dataitem)
    }
    console.log('bbbbbb55', formValues)
  }

  const submitForm = val => {
    try {
      console.log('will submitform', val)
      fetchSubmit(val)
    } catch (err) {
      // setSubmitting(false)
    }
  }
  const widthStyle = { width: 300 }
  console.log(initialValues)

  const dateFormat = 'DD-MM-YYYY'

  const formItems = [
    { heading: '', key: 'title' },
    {
      type: <Input name="name" />,
      key: 'name',
      label: 'Name',
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="hold">Hold</Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: <Input name="coupenCode" />,
      key: 'coupenCode',
      label: 'Coupon Code',
    },
    {
      type: <Input name="description" />,
      key: 'description',
      label: 'Description',
    },
    {
      type: (
        <Select
          // labelInValue
          name="type"
          showSearch
          style={widthStyle}
          placeholder="Select Type"
          optionFilterProp="children"
          onChange={sectionChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="flat">Flat</Option>
          <Option value="discount">Discount</Option>
        </Select>
      ),
      key: 'type',
      label: 'Type',
    },
    {
      type: (
        <Select
          // labelInValue
          name="method"
          showSearch
          style={widthStyle}
          placeholder="Select Method"
          optionFilterProp="children"
          onChange={sectionChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="coupon">Coupon</Option>
        </Select>
      ),
      key: 'method',
      label: 'Method',
    },
    {
      type: <Input name="amount" />,
      key: 'amount',
      label: offertype === 'flat' ? 'Amount' : 'Percentage',
    },
    {
      type: <Input name="minimum_amount_cart" />,
      key: 'minimum_cart',
      label: 'Minimum Amount In Cart',
    },
    {
      type: <Input name="maximum_total_usage" />,
      key: 'totalUsedCount',
      label: 'Max Total Usage',
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'validFrom',
      label: 'Start Date',
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'validTo',
      label: 'End Date',
    },
    {
      type: (
        <Select
          // labelInValue
          name="coupenTypeId"
          showSearch
          style={widthStyle}
          placeholder="Select Coupon section"
          optionFilterProp="children"
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {coupensection.map(i => (
            <Select.Option key={i.id} value={i.name}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'coupenTypeId',
      label: 'Coupon Section',
    },
    {
      type: (
        <Select
          // labelInValue
          mode="multiple"
          defaultValue={[]}
          showSearch
          style={widthStyle}
          placeholder="Select Item"
          optionFilterProp="children"
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {dataitem.map(i => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'offeritem', // please save
      label: 'Offer Item',
      resetOnChange: 'coupenTypeId',
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
      type: <InfiniteDropbox pageSize={5} optionData={getActiveUserPagination} />,
      key: 'userData',
      label: 'User',
    },
  ]

  if (success) return <Redirect to={LINKS.coupens} />

  return (
    <Form
      formItems={formItems}
      onSubmit={submitForm}
      initialValues={values}
      schema={coupenSchema}
      onChange={sectionChange}
    />
  )
}

export default withRouter(CoupenForm)
