/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo, useContext } from 'react'
import { withRouter } from 'react-router'
import { Input, notification, InputNumber, TimePicker } from 'antd'
import { Helmet } from 'react-helmet'
import { editGeneralsettings } from 'services'
import { generalSettingsSchema } from 'utils/Schema'
import { STRINGS, CATALOG_API_URL } from '_constants'
import Form, { FormContext } from 'components/Form'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetchingNoReducers'

const GeneralSettings = () => {
  const context = useContext(FormContext)
  console.log('lklklk context', context)
  const [{ response }] = useFetching(CATALOG_API_URL.getGeneralSettings)
  const [shippingCost, setShippingCost] = useState([])

  const [shippingTime, setShippingTime] = useState([])
  const onRemoveShipping = ind => {
    return () => {
      setShippingCost(prev => {
        return prev.filter(i => {
          console.log('ack a', prev.length)
          return (
            i.key !== `minimum[${ind}]` &&
            i.key !== `maximum[${ind}]` &&
            i.key !== `cost[${ind}]` &&
            i.key !== `removeShipping[${ind}]`
          )
        })
      })
    }
  }

  const onRemoveTimes = ind => {
    return () => {
      setShippingTime(prev => {
        return prev.filter(
          i =>
            i.key !== `startTime[${ind}]` &&
            i.key !== `endTime[${ind}]` &&
            i.key !== `removeTimes[${ind}]`,
        )
      })
    }
  }
  const initialValues = useMemo(() => {
    if (response?.data) {
      const obj = {
        cost: [],
        minimum: [],
        maximum: [],
        startTime: [],
        endTime: [],
      }
      let arr1 = []
      response.data.shippingCost.forEach((i, index) => {
        obj[`minimum[${index}]`] = i.minimum
        obj[`maximum[${index}]`] = i.maximum
        obj[`cost[${index}]`] = i.cost
        if (i.cost) obj.cost.push(i.cost)
        if (i.maximum) obj.maximum.push(i.maximum)
        if (i.minimum) obj.minimum.push(i.minimum)
        arr1 = [
          ...arr1,
          {
            type: <InputNumber min={0} />,
            key: `minimum[${index}]`,
            label: 'Minimum',
          },
          {
            type: <InputNumber min={0} />,
            key: `maximum[${index}]`,
            label: 'Maximum',
          },
          {
            type: <InputNumber min={0} />,
            key: `cost[${index}]`,
            label: 'Shipping Cost',
          },
          {
            type: (
              <AddNew
                pullRight={false}
                onRemove={onRemoveShipping(index)}
                attribute="shipping cost"
              />
            ),
            key: `removeShipping[${index}]`,
            className: 'remove-shipping-btn',
          },
        ]
      })
      setShippingCost(arr1)
      response.data.shippingTime.forEach((i, index) => {
        obj[`startTime[${index}]`] = i.startTime
        obj[`endTime[${index}]`] = i.endTime
        if (i.startTime) obj.startTime.push(i.startTime)
        if (i.endTime) obj.endTime.push(i.endTime)
        let arr2 = []
        arr2 = [
          ...arr2,
          {
            type: <TimePicker min={0} />,
            key: `startTime[${index}]`,
            label: 'Start Time',
          },
          {
            type: <TimePicker min={0} />,
            key: `endTime[${index}]`,
            label: 'End Time',
          },
          {
            type: (
              <AddNew pullRight={false} onRemove={onRemoveTimes(index)} attribute="time slot" />
            ),
            key: `removeTimes[${index}]`,
            className: 'remove-times-btn',
          },
        ]
        setShippingTime(arr2)
      })

      return {
        ...response.data,
        ...obj,
      }
    }
    return {}
  }, [response])


  const submitForm = async data => {
    console.log('ffffff',data)
    const a = await editGeneralsettings(data)
    if (a && a.success)
      notification.success({
        message: STRINGS.editSuccess,
      })
  }

  const handleAddShippingClick = () => {
    console.log('lkjfljsd onClick shipping')
    setShippingCost(prev => {
      console.log('ack', prev.length)
      return [
        ...prev,
        {
          type: <InputNumber min={0} />,
          key: `minimum[${parseInt(prev.length === 0 ? 0 : prev.length / 3, 10)}]`,
          label: 'Minimum',
        },
        {
          type: <InputNumber min={0} />,
          key: `maximum[${parseInt(prev.length === 0 ? 0 : prev.length / 3, 10)}]`,
          label: 'Maximum',
        },
        {
          type: <InputNumber min={0} />,
          key: `cost[${parseInt(prev.length === 0 ? 0 : prev.length / 3, 10)}]`,
          label: 'Shipping Cost',
        },
        {
          type: (
            <AddNew
              pullRight={false}
              onRemove={onRemoveShipping(parseInt(prev.length === 0 ? 0 : prev.length / 3, 10))}
              attribute="shipping cost"
            />
          ),
          key: `removeShipping[${parseInt(prev.length === 0 ? 0 : prev.length / 3, 10)}]`,
          className: 'remove-shipping-btn',
        },
      ]
    })
  }

  console.log('lkjfljsd', shippingCost.length > 0)

  const handleAddTimesClick = () => {
    console.log('lkjfljsd onClick times')
    setShippingTime(prev => [
      ...prev,
      {
        type: <TimePicker min={0} className={prev.length === 0 ? 'startTime-first' : ''} />,
        key: `startTime[${parseInt(prev.length === 0 ? 0 : prev.length / 2, 10)}]`,
        label: 'Start Time',
      },
      {
        type: <TimePicker min={0} />,
        key: `endTime[${parseInt(prev.length === 0 ? 0 : prev.length / 2, 10)}]`,
        label: 'End Time',
      },
      {
        type: (
          <AddNew
            pullRight={false}
            onRemove={onRemoveTimes(parseInt(prev.length === 0 ? 0 : prev.length / 2, 10))}
            attribute="time slot"
          />
        ),
        key: `removeTimes[${parseInt(prev.length === 0 ? 0 : prev.length / 2, 10)}]`,
        className: 'remove-times-btn',
      },
    ])
  }

  const formItems = [
    {
      type: <Input />,
      key: 'projectName',
      label: 'Project Name',
    },
    {
      type: <Input />,
      key: 'projectLabel',
      label: 'Project Label',
    },
    {
      type: <Input />,
      key: 'minCartValue',
      label: 'Min Cart Value',
    },
    {
      type: <Input />,
      key: 'freeShippingAbove',
      label: 'Free shipping above',
    },
    ...shippingCost,
    {
      type: (
        <AddNew pullRight={false} add onClick={handleAddShippingClick} attribute="shipping cost" />
      ),
      key: 'addShipping',
      className: 'add-new-shipping-btn',
    },
    ...shippingTime,
    {
      type: <AddNew pullRight={false} add onClick={handleAddTimesClick} attribute="time slot" />,
      key: 'addTimes',
      className: 'add-new-time-btn',
    },
  ]

  const form = (
    <Form.Provider
      className="general-settings-form"
      initialValues={initialValues}
      formItems={formItems}
      onSubmit={submitForm}
      schema={generalSettingsSchema}
    >
      <Form
        className="general-settings-form"
        initialValues={initialValues}
        formItems={formItems}
        onSubmit={submitForm}
        schema={generalSettingsSchema}
      />
    </Form.Provider>
  )

  return (
    <div>
      <Helmet title="General Settings" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>General Settings</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(GeneralSettings)
