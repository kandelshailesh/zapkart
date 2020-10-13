/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Tabs, notification, Button } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import { addMerchant, editMerchant } from 'services/merchants'
import useFormValidation from 'hooks/useFormValidation'
import { merchantSchema } from 'utils/Schema'
import { STRINGS } from '_constants'
import _ from 'lodash'
import AGeneral from './AGeneral'
import AContact from './AContact'
import AAccount from './AAccount'

export const FormContext = React.createContext({})
const FormProvider = FormContext.Provider
export const FormConsumer = FormContext.Consumer

const generalFields = [
  'status',
  'merchantTypeId',
  'name',
  'address',
  'country',
  'state',
  'city',
  'zipcode',
  'regnumber',
  'establishdate',
  'languauge',
  'latitude',
  'longitude',
  'profiledescription',
  'commissionslab',
  'designation',
  'website',
]

const contactFields = ['firstName', 'lastName', 'email', 'password', 'confirmpassword']

const accountFields = ['accounttypeId', 'nameonaccount', 'accountdetails']

const { TabPane } = Tabs

const redStyle = { color: 'red' }

// const mandatoryAttributes = ['5e2812b3052366bc35d52f7c', '5e27f253abc92db82b65a57a']

const FormIndex = props => {
  console.log('e444', props)
  const { data, title } = props
  // let transformedData = null
  // if (data) transformedData = transformMerchantToForm(data)
  // console.log("tr22",transformedData)
  const initialValues = data || {
    status: 'hold',
  }

  let tabLength = 3
  if (data) tabLength = 4
  const [activeKey, setActiveKey] = useState('0')
  // eslint-disable-next-line no-unused-vars
  const [errorTabs, setErrorTabs] = useState({})

  const submitForm = async () => {
    console.log('will submit entire form', values)
    const newData = data ? await editMerchant(values, data.id, data) : await addMerchant(values)
    console.log('new data', newData)
    if (newData) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      if (!data) setSuccessId(newData._id)
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
  } = useFormValidation(initialValues, merchantSchema, submitForm)

  console.log(values)

  // const onSubmit = React.useCallback((ev) => onNext(ev, { notifyMsg: STRINGS.formsErrors }), [])
  // use useReducers
  // const [isErrorTabOne, setIsErrorTabOne] = useState(false)

  React.useEffect(() => {
    console.log('main useEffect errors', errors)
    const errorKeys = Object.keys(errors)

    if (_.intersection(errorKeys, generalFields).length > 0)
      setErrorTabs(prev => ({ ...prev, general: true }))
    else setErrorTabs(prev => ({ ...prev, general: false }))
    if (_.intersection(errorKeys, contactFields).length > 0)
      setErrorTabs(prev => ({ ...prev, contact: true }))
    else setErrorTabs(prev => ({ ...prev, contact: false }))
    if (_.intersection(errorKeys, accountFields).length > 0)
      setErrorTabs(prev => ({ ...prev, account: true }))
    else setErrorTabs(prev => ({ ...prev, account: false }))
  }, [errors])

  const [formsValues, setformsValues] = useState({})
  const [successId, setSuccessId] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  //  const [isErrorTabThree, setIsErrorTabThree] = useState(false)

  console.log('formsValues', formsValues)
  console.log('isSubmit', isSubmit)

  // eslint-disable-next-line no-unused-vars
  const handleTabNextClick = (vals, isLast = false) => {
    setActiveKey(a => {
      const no = Number(a)
      console.log(no)
      return Math.min(no + 1, tabLength).toString()
    })
    setformsValues(prev => ({ ...prev, ...vals }), setIsSubmit(isLast))
  }

  // eslint-disable-next-line no-unused-vars
  const handleTabPrevClick = vals => {
    if (Number(activeKey) > 1) {
      setActiveKey(() => {
        return Math.min
      })
    }
  }

  const onChangeTab = a => {
    console.log('onChangeTab', a)
    setActiveKey(a)
  }
  console.log(activeKey, typeof activeKey)

  if (successId) return <Redirect to={`/catalog/products/product/${successId}`} />

  return (
    <>
      {title && (
        <div className="utils__title">
          <strong>{title}</strong>
        </div>
      )}
      <FormProvider
        value={{
          // onSubmit: handleTabNextClick,
          setIsError: (name, isError) => {
            setErrorTabs(a => ({ ...a, [name]: isError }))
          },
          originalData: data,
          onChange,
          values,
          setValues,
          onSubmit,
          onBlur,
          errors,
          setSubmitting,
          isSubmitting,
        }}
      >
        {activeKey !== '4' && (
          <div className="left-spaced">
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
            <Link to="/merchant">
              <Button type="dashed">Cancel</Button>
            </Link>
          </div>
        )}
        <Tabs tabPosition="left" activeKey={activeKey} onChange={onChangeTab}>
          <TabPane
            tab={<span>{errorTabs.general && <span style={redStyle}>*</span>} General</span>}
            key={0}
          >
            <AGeneral name="general" hideSubmit />
          </TabPane>

          <TabPane
            tab={
              <span>{errorTabs.contact && <span style={redStyle}>*</span>} Contact Details</span>
            }
            key={1}
          >
            <AContact name="contact" hideSubmit />
          </TabPane>

          <TabPane
            tab={
              <span>{errorTabs.account && <span style={redStyle}>*</span>} Account Details</span>
            }
            key={2}
          >
            <AAccount name="account" hideSubmit />
          </TabPane>
        </Tabs>
      </FormProvider>
    </>
  )
}

export default FormIndex
