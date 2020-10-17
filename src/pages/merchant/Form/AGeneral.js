/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState,useContext } from 'react'
import { Radio, Input, Select, DatePicker } from 'antd'
import { getUserGroups, getCountries, getStat, getCity,getZip } from 'services'
import  Form, { FormContext }  from 'components/Form'

// import PropTypes from 'prop-types'
// import useUpload from 'hooks/useUpload'

import { ROLES  } from '_constants'

// const  { Option }  = Select.Option
// import {  } from '_constants'

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//     lg: { span: 5 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//     lg: { span: 12 },
//     // lg: { span: 18 },
//   },
// }

const widthStyle = { width: 300 }

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AGeneral = () => {
  // pass initial data as well
  const { values } = useContext(FormContext)

  const [merchantTypes, setMerchantTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [stat, setStats] = useState([])
  const [citie, setCitie] = useState([])
  const [zip,setZip] = useState([])
  const [cityval,setCityval] = useState('')
  const [stateval,setStateval] = useState('KERALA')
  const [zipval,setZipVal] = useState('')
  // const [hasError, setErrors] = useState(false);
  // const [medicineTypes, setMedicineTypes] = useState([])

  // console.log("d3333333",values.data.name)

  // const initialValues = data || {
  //   featured: false,
  //   status: 'hold',
  //   priorityOrder: 0,
  //   prescriptionNeeded: false,
  // }

  // const {
  //   fileList: fileListImages,
  //   beforeUpload: beforeUploadImages,
  //   onChange: onChangeImages,
  //   onRemove: onRemoveImages,
  //   touched: imagesTouched,
  //   setFileList: setFileListImages,
  // } = useUpload(1)

  // const fetchstates = async id => {
  //   console.log('MMM fetching states')
  //   const cData = await getStates(id)
  //   console.log('MMM', cData)
  //   if (cData) setStates(cData)
  // }

  const fetchCity = async id => {
    const cData = await getCity(id)
    if (cData) setCitie(cData)
  }

  const fetchZip = async id => {
    const cData = await getZip(id)
    if (cData) setZip(cData)
  }

  // fetch categories, brands, compositions on component mount

  useEffect(() => {
    const fetchStat = async () => {
      const cData = await getStat()
      if (cData) setStats(cData)
      console.log('state is ',stat)
    }
    fetchStat()

  },[stateval])
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

   

    // const fetchCity = async() => {
    //   const cData = await getCity(stateval)
    //   console.log('passing state is',stateval)
    //   if (cData) setCitie(cData)
    //   console.log('city is ',citie)
    // }
    // setFileListImages(values.avatarlocation)
    // const fetchMedicineTypes = async ()
    fetchMerchantType()
    fetchCountries()
    // fetchCity()
    console.log('stateval')
  }, [])

  // useEffect(() => {
  //   console.log('MMM cc', values.countryId)
  //   if (values.countryId && values.countryId !== '') {
  //     // setStates([])
  //     // setValues((prev) => ({ ...prev, stateId: null, cityId:null }))
  //     fetchstates(values.countryId)
  //   }
  // }, [values.countryId])

  useEffect(() => {
    console.log('MMM dd', values.state)
    if (values.state && values.state !== '') {
      setCitie([])
      // setValues((prev) => ({ ...prev, cityId: null }))
      fetchCity(values.state)
    }
  }, [values.state])

  useEffect(() => {
    console.log('zipcode',values.district)
    if (values.district && values.district !==''){
      setZip([])
      fetchZip(values.district)
    }
  },[values.district])

  // useEffect(() => {
  //   const url = CATALOG_API_URL.getStates
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     res
  //       .json()
  //       .then(result => setStats(result))
  //       .catch(err => setErrors(err));
  //   }

  //   fetchData();
  // });

  // useEffect(() => {
  //   const url = CATALOG_API_URL.getCity
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     res
  //       .json()
  //       .then(result => setCitie(result))
  //       .catch(err => setErrors(err));
  //   }

  //   fetchData();
  //   console.log('error is',hasError)
  // });

  // const onChangeStates = (e) => {

  // }

  // const onChangeStartDate = (e) =>
  //   setValues((a) => ({ ...a, establishdate: new Date(e).toISOString() }))

  // useEffect(() => {
  //   if (fileListImages && imagesTouched) {
  //     setValues((a) => ({ ...a, image: fileListImages }))
  //   }
  // }, [fileListImages])

  // const propsImages = {
  //   multiple: true,
  //   beforeUpload: beforeUploadImages,
  //   onRemove: onRemoveImages,
  //   onChange: onChangeImages,
  //   fileList: fileListImages,
  // }

  // const onChangeMerchantType = (e) => setValues((a) => ({ ...a, merchantTypeId: e }))
  // const onChangeCity = (e) => setValues((a) => ({ ...a, cityId: e }))
  const dateFormat = 'DD-MM-YYYY'

  // const onChangeCountry = (e) => {
  //   console.log('countryee', e)
  //   setValues((a) => ({ ...a, countryId: e }))
  //   fetchstates(e)
  // }

  // const onChangeState = (e) => {
  //   console.log('countryee', e)
  //   setValues((a) => ({ ...a, stateId: e }))
  //   fetchcities(e)
  // }

  

  // const onCityChange = (e) => {
  //   setCityval(e.target.value)
  // }

  // const onStateChange = (e) => {
  //   setStateval(e.taget.value)
  // }

  // console.log(citie)
  // console.log('state value is',stateval)

  // const xyz = (e) => {
  //   setStateval({value: e.target.value})
  // }

  // const chang = (event) => {
  //   setStateval({value: event.target.value})
  // } 
  // useEffect(() => {
  //   chang()
    
  // },[stateval])


  const formItems = [
    { heading: 'General' },
    {
      type: (
        <Radio.Group name="status" buttonStyle="solid">
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="hold">Hold</Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: (
        <Select
          // labelInValue
          showSearch
          style={widthStyle}
          placeholder="Select MerchantType"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          // onChange={onChangeMerchantType}
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
      key: 'merchantTypeId',
      label: 'Merchant Type',
    },
    {
      type: <Input name="name" />,
      key: 'name',
      label: 'Name',
    },
    {
      type: <Input.TextArea name="address" />,
      key: 'address',
      label: 'Address',
    },
    // {
    //   type: (
    //     <Select
    //       showSearch
    //       style={widthStyle}
    //       placeholder="Select Country"
    //       optionFilterProp="children"
    //       // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
    //       // onChange={onChangeCountry}
    //       // onFocus={onFocus}
    //       // onBlur={onBlur}
    //       // onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
    //       {countries.map(i => (
    //         <Select.Option key={i.id} value={i.id}>
    //           {i.name}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    //   key: 'countryId',
    //   label: 'Country',
    // },
    {
      type: (
        <Select
          // labelInValue
          showSearch
          style={widthStyle}
          placeholder="Select State"
          optionFilterProp="children"
          // onSelect={xyz}
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          // onChange={onChangeState}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          // onChange={xyz}
          onChange={e => setStateval({stateval:e.target.value})}
          value={stateval}
          // onSelect={e => setStateval(e.target.value)}
          
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* console.log(stateval) */}
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {stat.map(i => (
            // <Select.Option key={i} value={i}>
            //   {i}
            // </Select.Option>
            <Select.Option key={i} value={i} onSelect={(e) => {console.log('stvl',stateval,e); setStateval({stateval:e.target.value})}}>{i}</Select.Option>
          ))}
        </Select>
      ),
      key: 'state',
      label: 'State',
      resetOnChange: 'countryId',
    },
    {
      type: (
        <Select
          // labelInValue
          showSearch
          style={widthStyle}
          placeholder="Select District"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          // onChange={onChangeCity}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          onChange={e => setCityval({cityval:e.target.value})}
          value={cityval}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {citie.map(i => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'district',
      label: 'District',
      resetOnChange: 'state',
    },
    {
      type: <Input name="city" />,
      key: 'city',
      label: 'City',
    },
    {
      type: (
        <Select
          
          showSearch
          style={widthStyle}
          placeholder="Select Zipcode"
          optionFilterProp="children"
          onChange={e => setZipVal({zipval:e.target.value})}
          value={zipval}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {zip.map(i => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'zipcode',
      label: 'ZipCode',
      resetOnChange: 'district',
    },

    {
      type: <Input name="regnumber" />,
      key: 'regnumber',
      label: 'regNo',
    },
    {
      type: <Input.TextArea name="profiledescription" />,
      key: 'profiledescription',
      label: 'Profile Description',
    },
    {
      type: <Input name="latitude" />,
      key: 'latitude',
      label: 'Latitude',
    },
    {
      type: <Input name="longitude" />,
      key: 'longitude',
      label: 'Longitude',
    },
    {
      type: <DatePicker format={dateFormat} allowClear={false} showToday />,
      key: 'establishdate',
      label: 'Establishment Date',
    },

    {
      type: <Input name="commissionslab" />,
      key: 'commissionslab',
      label: 'Commission Slab',
    },
    {
      type: <Input name="designation" />,
      key: 'designation',
      label: 'Designation',
    },
    {
      type: <Input name="website" />,
      key: 'website',
      label: 'website',
    },
    // {
    //   label: 'Images',
    //   key: 'image',
    //   name: 'image',
    //   type: (
    //     <>
    //       <Upload
    //         listType="picture-card"
    //         name="image" // {...propsImages}
    //       >
    //         {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
    //         <Button>
    //           <Icon type="upload" /> Select File
    //         </Button>
    //       </Upload>
    //     </>
    //   ),
    // },
  ]

  return <Form formItems={formItems} />
}

// AGeneral.propTypes = {
//   hideSubmit: PropTypes.bool,
//   hasTitle: PropTypes.bool,
//   formControls: PropTypes.object,
// }

AGeneral.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default AGeneral
