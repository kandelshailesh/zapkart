/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Select, notification } from 'antd'
import { deliveryAdminLocationSchema, deliveryMerchantLocationSchema } from 'utils/Schema'
// import callApi from 'utils/callApi'
import { formItemLayout, tailFormItemLayout } from 'utils'
import { Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addDeliveryLocation, editDeliveryLocation } from 'services/deliverLocation'
import { STRINGS } from '_constants'
import { getStat, getCity, getZip, getAllMerchnats } from 'services'
import { connect } from 'react-redux'

// import useUpload from 'hooks/useUpload'
import Demo from './dynamic'

const { Option } = Select

const FormA = (props) => {
  console.log('props', props)
  const { data, user } = props
  useEffect(() => {
    console.log(values, props, errors)
    if (data) {
      setValues({ ...data })
    }
  }, [values, errors])

  const initialValues = {
    status: 'hold',
    // type: 'single',
  }

  const [pincode, setPincode] = useState([])
  // const [pincodeOptions, setpincodeOptions] = useState([])
  // const [countries, setCountries] = useState([])
  const [merchants, setMerchants] = useState([])
  const [stat, setStats] = useState([])
  const [citie, setCitie] = useState([])
  const [zip, setZip] = useState([])
  const [cityval, setCityval] = useState('')
  const [stateval, setStateval] = useState('KERALA')
  const [zipval, setZipVal] = useState('')

  // const fetchPinCodes = async () => {
  //   const url = '/api/catalog/v1/indianpincode'
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  //   try {
  //     const res = await callApi(url, options)
  //     console.log('response get', res)
  //     if (res.data) return { data: res.data }
  //   } catch (error) {
  //     console.log('error', error)
  //     notification.error({
  //       message: 'Error!',
  //       description: error.message,
  //     })
  //   }
  //   return null
  // }

  const fetchSubmit = async () => {
    console.log('values', values)
    delete values.state
    delete values.district
    if (values.start && values.end) {
      delete values.start
      delete values.end
    }
    console.log('values', values)
    const a = data
      ? await editDeliveryLocation(data._id, values)
      : await addDeliveryLocation({ ...values })
    // const a = await addDeliveryLocation({ ...values })
    console.log('a', a)
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
      setSuccess(false)
      // setPincode([])
    } catch (err) {
      setSubmitting(false)
    }
  }

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
  } = useFormValidation(
    initialValues,
    user.userTypeId === 1 ? deliveryAdminLocationSchema : deliveryMerchantLocationSchema,
    submitForm,
  ) // file as object {fileInputName:'icon', maxCount:1}
  console.log('values', values)

  const fetchCity = async (id) => {
    const cData = await getCity(id)
    if (cData) setCitie(cData)
  }

  const fetchZip = async (id) => {
    const cData = await getZip(id)
    if (cData) setZip(cData)
  }

  // fetch categories, brands, compositions on component mount

  useEffect(() => {
    const fetchStat = async () => {
      const cData = await getStat()
      if (cData) setStats(cData)
      console.log('state is ', stat)
    }
    fetchStat()
  }, [stateval])

  useEffect(() => {
    console.log('MMM dd', values.state)
    if (values.state && values.state !== '') {
      setCitie([])
      // setValues((prev) => ({ ...prev, cityId: null }))
      fetchCity(values.state)
    }
  }, [values.state])

  useEffect(() => {
    console.log('pincode', values.district)
    if (values.district && values.district !== '') {
      setZip([])
      fetchZip(values.district)
    }
  }, [values.district])

  useEffect(() => {
    const fetchMerchants = async () => {
      const cData = await getAllMerchnats()
      if (cData) setMerchants(cData)
    }
    fetchMerchants()
  }, [])

  const [success, setSuccess] = useState(false)

  const handlePincodes = (pinArray) => {
    console.log('parent', pinArray)
    setPincode(pinArray)
    setValues((a) => ({
      ...a,
      pincodes: pinArray,
    }))
    console.log('pin', pincode, values.pincodes)
    // values.pincodes=pinArray
  }

  const widthStyle = { width: 300 }
  let formItems = [
    {
      type: <Input value={values.location_name} name="location_name" />,
      key: 'location_name',
      label: 'Location Name',
      error: errors.location_name,
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
      type: (
        <Radio.Group
          // onChange={(e) => handleTypeChange(e)}
          name="type"
          // defaultValue="single"
          buttonStyle="solid"
        >
          <Radio.Button checked={values.type === 'single'} value="single">
            Single
          </Radio.Button>
          <Radio.Button checked={values.type === 'range'} value="range">
            Range
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'type',
      label: 'Type',
      error: errors.type,
    },
    {
      type: (
        <Select
          // labelInValue
          showSearch
          style={widthStyle}
          placeholder="Select State"
          optionFilterProp="children"
          onChange={(e) => {
            console.log('stvl', stateval, e)
            setStateval({ stateval: e })
            setValues((a) => ({ ...a, state: e }))
          }}
          name="state"
          value={values.state}
          // onSelect={e => setStateval(e.target.value)}

          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {console.log(stateval.stateval)}
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {stat.map((i) => (
            // <Select.Option key={i} value={i}>
            //   {i}
            // </Select.Option>
            <Option
              key={i}
              value={i}
              onSelect={(e) => {
                console.log('stvl', stateval, e)
                setStateval({ stateval: e })
              }}
            >
              {i}
            </Option>
          ))}
        </Select>
      ),
      key: 'state',
      label: 'State',
      // resetOnChange: 'countryId',
    },
    {
      type: (
        <Select
          // labelInValue
          showSearch
          style={widthStyle}
          placeholder="Select District"
          optionFilterProp="children"
          onChange={(e) => {
            setCityval({ cityval: e })
            setValues((a) => ({ ...a, district: e }))
          }}
          name="district"
          value={values.district || cityval.cityval}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {citie.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ),
      key: 'district',
      label: 'District',
      resetOnChange: 'state',
    },
    {
      type: (
        <Select
          showSearch
          style={widthStyle}
          placeholder="Select Pincode"
          optionFilterProp="children"
          onChange={(e) => {
            setZipVal({ zipval: e })
            setValues((a) => ({ ...a, pincodes: e }))
          }}
          value={values.pincodes || zipval.zipval}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {zip.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ),
      label: 'Pincodes',
      key: 'pincodes',
      error: errors.pincodes,
      resetOnChange: 'city',
    },
    // {
    //   label: 'Merchant',
    //   error: errors.merchantId,
    //   key: 'merchantId',
    //   name: 'merchantId',
    //   visible: [1],
    //   // edit: isEdit,
    //   type: (
    //     <Select
    //       name="merchantId"
    //       value={values.merchantId}
    //       placeholder="Select Merchant"
    //       onChange={(a) => setValues((prev) => ({ ...prev, merchantId: a }))}
    //       // style={{ width: '100%' }}
    //       // onPopupScroll={this.handlePopupScroll}
    //     >
    //       {merchants.map((d) => (
    //         <Select.Option key={d.userId} value={d.userId}>
    //           {d.name}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    // },

    // {
    //   type: (
    //     <>
    //       {' '}
    //       <Select
    //         // value={values.pincodes}
    //         placeholder="Select Pincode"
    //         onChange={(e) => setValues((a) => ({ ...a, pincodes: e }))}
    //         name="category"
    //       >
    //         {pincode.map((item) => (
    //           <Option key={item} value={item}>
    //             {item}
    //           </Option>
    //         ))}
    //       </Select>
    //     </>
    //   ),
    //   label: 'Pincodes',
    //   key: 'pincodes',
    //   error: errors.pincodes,
    // },
    // { ...pincodeOptions[0] },
  ]
  const options = [
    {
      type: (
        <>
          {' '}
          <Demo values={data} setValues={setValues} handlePincodes={handlePincodes} />
        </>
      ),
      label: 'Pincodes',
      key: 'pincodes',
      error: errors.pincodes,
    },
  ]
  const adminMerchantId = [
    {
      label: 'Merchant',
      error: errors.merchantId,
      key: 'merchantId',
      name: 'merchantId',
      visible: [1],
      // edit: isEdit,
      type: (
        <Select
          name="merchantId"
          value={values.merchantId}
          placeholder="Select Merchant"
          onChange={(a) => setValues((prev) => ({ ...prev, merchantId: a }))}
          // style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {merchants.map((d) => (
            <Select.Option key={d.userId} value={d.userId}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ]
  if (user.userTypeId === 1) {
    formItems = [...adminMerchantId, ...formItems]
  }
  if (values.type === 'range') {
    console.log('in', options)
    const filteredState = formItems.filter(
      (item) => item.key !== 'state' && item.key !== 'district',
    )
    formItems = [...filteredState.filter((item) => item.key !== 'pincodes'), ...options]
  }
  if (success) return <Redirect to="/deliverLocation" />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        console.log('item', item)
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

export default connect(({ user }) => ({ user }))(FormA)

//   /* <Form.List name="users">
//               //   {(fields, { add, remove }) => {
//               //     console.log(
//               //       'fields',
//               //       fields,
//               //     )(
//               //       <>
//               //         {fields.map((field) => (
//               //           <div
//               //             key={field.key}
//               //             style={{ display: 'flex', marginBottom: 8 }}
//               //             align="baseline"
//               //           >
//               //             <Form.Item
//               //               {...field}
//               //               name={[field.name, 'first']}
//               //               fieldKey={[field.fieldKey, 'first']}
//               //               rules={[{ required: true, message: 'Missing first name' }]}
//               //             >
//               //               <Input placeholder="First Name" />
//               //             </Form.Item>
//               //             <Form.Item
//               //               {...field}
//               //               name={[field.name, 'last']}
//               //               fieldKey={[field.fieldKey, 'last']}
//               //               rules={[{ required: true, message: 'Missing last name' }]}
//               //             >
//               //               <Input placeholder="Last Name" />
//               //             </Form.Item>
//               //             <Tooltip title="Delete attribute">
//               //               {' '}
//               //               <Button
//               //                 size="small"
//               //                 shape="circle"
//               //                 type="primary"
//               //                 onClick={() => remove(field.name)}
//               //               >
//               //                 {' '}
//               //                 <Icon type="minus" />
//               //               </Button>
//               //             </Tooltip>{' '}
//               //           </div>
//               //         ))}
//               //         <Tooltip title="Add new attribute">
//               //           <Button shape="circle" size="small" onClick={() => add()} type="primary">
//               //             <Icon type="plus" />
//               //           </Button>
//               //         </Tooltip>
//               //       </>,
//               //     )
//               //   }}*/
// }
