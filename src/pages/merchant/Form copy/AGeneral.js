/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react'
import { Button, Form, Radio, Input, Select, Upload, Icon, DatePicker } from 'antd'
import { getUserGroups, getCountries, getStates, getCities } from 'services'
import PropTypes from 'prop-types'
import useUpload from 'hooks/useUpload'
import moment from 'moment'
import { ROLES } from '_constants'
import { FormContext } from './index'

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

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AGeneral = ({ hideSubmit, hasTitle, formControls }) => {
  // pass initial data as well
  const [merchantTypes, setMerchantTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  // const [medicineTypes, setMedicineTypes] = useState([])

  console.log('formControls', formControls)
  const formContext = useContext(FormContext)
  console.log('formContext', formContext)
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    originalData,
    // setSubmitting,
    isSubmitting,
    // data,
  } = formControls || formContext
  // console.log("d3333333",values.data.name)
  console.log('originalData', originalData)

  // const initialValues = data || {
  //   featured: false,
  //   status: 'hold',
  //   priorityOrder: 0,
  //   prescriptionNeeded: false,
  // }

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    touched: imagesTouched,
    setFileList: setFileListImages,
  } = useUpload(1)

  const fetchstates = async id => {
    const cData = await getStates(id)
    if (cData) setStates(cData)
  }

  const fetchcities = async id => {
    const cData = await getCities(id)
    if (cData) setCities(cData)
  }

  // fetch categories, brands, compositions on component mount
  useEffect(() => {
    const fetchMerchantType = async () => {
      const cData = await getUserGroups(ROLES.merchant)
      if (cData) setMerchantTypes(cData)
    }
    const fetchCountries = async () => {
      const cData = await getCountries()
      if (cData) setCountries(cData)
      console.log('888', countries)
    }
    setFileListImages(values.avatarlocation)
    // const fetchMedicineTypes = async ()
    fetchMerchantType()
    fetchCountries()
  }, [])

  const onChangeStartDate = e =>
    setValues(a => ({ ...a, establishdate: new Date(e).toISOString() }))

  useEffect(() => {
    if (fileListImages && imagesTouched) {
      setValues(a => ({ ...a, image: fileListImages }))
    }
  }, [fileListImages])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  const onChangeMerchantType = e => setValues(a => ({ ...a, merchantTypeId: e }))
  const onChangeCity = e => setValues(a => ({ ...a, cityId: e }))
  const dateFormat = 'DD-MM-YYYY'

  const onChangeCountry = e => {
    console.log('countryee', e)
    setValues(a => ({ ...a, countryId: e }))
    fetchstates(e)
  }

  const onChangeState = e => {
    console.log('countryee', e)
    setValues(a => ({ ...a, stateId: e }))
    fetchcities(e)
  }

  const formItems = [
    { heading: hasTitle ? 'General' : undefined },
    {
      type: (
        <Radio.Group name="status" defaultValue={values.status} buttonStyle="solid">
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
        <Select
          // labelInValue
          defaultValue={values.merchantTypeId}
          showSearch
          style={widthStyle}
          placeholder="Select MerchantType"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeMerchantType}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {merchantTypes.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'merchanttypeId',
      label: 'Merchant Type',
      error: errors.merchantTypeId,
    },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: <Input.TextArea value={values.address} name="address" />,
      key: 'address',
      label: 'Address',
      error: errors.address,
    },
    {
      type: (
        <Select
          // labelInValue
          defaultValue={values.countryId}
          showSearch
          style={widthStyle}
          placeholder="Select Country"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeCountry}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {countries.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'country',
      label: 'Country',
      error: errors.country,
    },
    {
      type: (
        <Select
          // labelInValue
          defaultValue={values.stateId}
          showSearch
          style={widthStyle}
          placeholder="Select State"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeState}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {states.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'state',
      label: 'State',
      error: errors.state,
    },
    {
      type: (
        <Select
          // labelInValue
          defaultValue={values.cityId}
          showSearch
          style={widthStyle}
          placeholder="Select City"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={onChangeCity}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {cities.map(i => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'city',
      label: 'City',
      error: errors.city,
    },
    {
      type: <Input value={values.zipcode} name="zipcode" />,
      key: 'zipcode',
      label: 'zipCode',
      error: errors.zipcode,
    },
    {
      type: <Input value={values.regnumber} name="regnumber" />,
      key: 'regnumber',
      label: 'regNo',
      error: errors.regnumber,
    },
    {
      type: <Input.TextArea value={values.profiledescription} name="profiledescription" />,
      key: 'profiledescription',
      label: 'Profile Description',
      error: errors.profiledescription,
    },
    {
      type: <Input value={values.latitude} name="latitude" />,
      key: 'latitude',
      label: 'Latitude',
      error: errors.latitude,
    },
    {
      type: <Input value={values.longitude} name="longitude" />,
      key: 'longitude',
      label: 'Longitude',
      error: errors.longitude,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          showToday
          value={moment(values.startDate)}
          onChange={onChangeStartDate}
        />
      ),
      key: 'establishmentDate',
      label: 'Establishment Date',
      error: errors.establishmentDate,
    },

    {
      type: <Input value={values.commissionslab} name="commissionslab" />,
      key: 'commissionslab',
      label: 'Commission Slab',
      error: errors.commissionslab,
    },
    {
      type: <Input value={values.designation} name="designation" />,
      key: 'designation',
      label: 'Designation',
      error: errors.designation,
    },
    {
      type: <Input value={values.website} name="website" />,
      key: 'website',
      label: 'website',
      error: errors.website,
    },
    {
      label: 'Images',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType="picture-card" name="image" {...propsImages}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
  ]

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

        if (item.dependency) {
          if (values[item.dependency] === 'true' || values[item.dependency] === true) {
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
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

AGeneral.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

AGeneral.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default AGeneral
