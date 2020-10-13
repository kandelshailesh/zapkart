/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo, useCallback } from 'react'
import { Tabs, notification, Button } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import { addMerchant, editMerchant } from 'services/merchants'
import { merchantSchema } from 'utils/Schema'
import Form from 'components/Form'
import { isEmpty, intersection } from 'lodash'
import { STRINGS } from '_constants'
import AGeneral from './AGeneral'
import AContact from './AContact'
import AAccount from './AAccount'
import Agreements from '../agreements'

const contactFields = ['firstName', 'lastName', 'email', 'password', 'confirmpassword']

const accountFields = ['accounttypeId', 'nameonaccount', 'accountdetails']

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

const { TabPane } = Tabs

const redStyle = { color: 'red' }

// const mandatoryAttributes = ['5e2812b3052366bc35d52f7c', '5e27f253abc92db82b65a57a']

const FormIndex = (props) => {
  console.log('e444', props)
  const { data, title } = props

  // const sampleVals = {
  //   'status': "hold",
  //   'merchantTypeId': null,
  //   'name': null,
  //   'address': null,
  //   'country': null,
  //   'state': null,
  //   'city': null,
  //   'zipcode': null,
  //   'regnumber': null,
  //   'establishdate': null,
  //   'languauge': null,
  //   'latitude':null,
  //   'longitude': null,
  //   'profiledescription': null,
  //   'commissionslab': null,
  //   'designation': null,
  //   'website': null,
  //   'firstName': null, 'lastName': null, 'email': null, 'password': null, 'confirmpassword': null,'accounttypeId': null, 'nameonaccount': null, 'accountdetails':  null
  // }

  const initialValues = useMemo(() => {
    return !isEmpty(data) ? data : { status: 'hold' }
  }, [])
  // const initialValues = !isEmpty(data) ? data : { status: 'hold' }

  const [activeKey, setActiveKey] = useState('0')
  const [activeTopKey, setActiveTopKey] = useState('a')
  const [redirect, setRedirect] = useState(false)

  const submitForm = async (values) => {
    console.log('will submit entire form', values)
    const newData = data ? await editMerchant(values, data.id, data) : await addMerchant(values)
    console.log('new data', newData)
    if (newData) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      // if (!data) setSuccessId(newData._id)
      setRedirect(true)
    }
  }

  const checkIsError = useCallback((errors, key) => {
    switch (key) {
      case 'general': {
        return intersection(Object.keys(errors), generalFields).length > 0
      }
      case 'contact': {
        return intersection(Object.keys(errors), contactFields).length > 0
      }
      case 'account': {
        return intersection(Object.keys(errors), accountFields).length > 0
      }
      default:
        return false
    }
  }, [])

  // const onSubmit = React.useCallback((ev) => onNext(ev, { notifyMsg: STRINGS.formsErrors }), [])
  // use useReducers
  // const [isErrorTabOne, setIsErrorTabOne] = useState(false)

  // React.useEffect(() => {
  //   console.log('main useEffect errors', errors)
  //   const errorKeys = Object.keys(errors)

  //   if (_.intersection(errorKeys, generalFields).length > 0)
  //     setErrorTabs(prev => ({ ...prev, general: true }))
  //   else setErrorTabs(prev => ({ ...prev, general: false }))
  //   if (_.intersection(errorKeys, contactFields).length > 0)
  //     setErrorTabs(prev => ({ ...prev, contact: true }))
  //   else setErrorTabs(prev => ({ ...prev, contact: false }))
  //   if (_.intersection(errorKeys, accountFields).length > 0)
  //     setErrorTabs(prev => ({ ...prev, account: true }))
  //   else setErrorTabs(prev => ({ ...prev, account: false }))
  // }, [errors])

  //  const [isErrorTabThree, setIsErrorTabThree] = useState(false)

  const onChangeTab = (a) => {
    console.log('onChangeTab', a)
    setActiveKey(a)
  }

  const onChangeTopTab = (a) => {
    console.log('onChangeTopTab', a)
    setActiveTopKey(a)
  }

  if (redirect) return <Redirect to="/merchant" />

  return (
    <>
      {title && (
        <div className="utils__title">
          <strong>{title}</strong>
        </div>
      )}
      <Tabs tabPosition="top" activeKey={activeTopKey} onChange={onChangeTopTab}>
        <TabPane tab="General Details" key="a">
          <Form.Provider
            initialValues={initialValues}
            schema={merchantSchema}
            onSubmit={submitForm}
          >
            <Form.Consumer>
              {({ onSubmit, errors, isSubmitting }) => (
                <>
                  {activeKey !== '3' && (
                    <div className="left-spaced">
                      <Button loading={isSubmitting} onClick={onSubmit} type="primary">
                        Submit
                      </Button>
                      <Link to="/merchant">
                        <Button type="dashed">Cancel</Button>
                      </Link>
                    </div>
                  )}
                  <Tabs tabPosition="left" activeKey={activeKey} onChange={onChangeTab}>
                    <TabPane
                      tab={
                        <span>
                          {checkIsError(errors, 'general') && <span style={redStyle}>*</span>}{' '}
                          General
                        </span>
                      }
                      key={0}
                    >
                      <AGeneral name="general" hideSubmit />
                    </TabPane>

                    <TabPane
                      tab={
                        <span>
                          {checkIsError(errors, 'contact') && <span style={redStyle}>*</span>}{' '}
                          Contact Details
                        </span>
                      }
                      key={1}
                    >
                      <AContact name="contact" hideSubmit />
                    </TabPane>

                    <TabPane
                      tab={
                        <span>
                          {checkIsError(errors, 'account') && <span style={redStyle}>*</span>}{' '}
                          Account Details
                        </span>
                      }
                      key={2}
                    >
                      <AAccount name="account" hideSubmit />
                    </TabPane>
                  </Tabs>
                </>
              )}
            </Form.Consumer>
          </Form.Provider>
        </TabPane>
        {data?.id && (
          <TabPane key="b" tab="Agreements">
            <Agreements userId={data.userId} />
          </TabPane>
        )}
      </Tabs>
    </>
  )
}

export default FormIndex
