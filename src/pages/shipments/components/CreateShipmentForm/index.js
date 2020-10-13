import React, { useContext } from 'react'
import CardWrapper from 'components/CardWrapper'
import Form, { FormContext } from 'components/Form'
import { createShipmentSchema } from 'utils/Schema'
import { Button, Input, Select, DatePicker, Checkbox, TimePicker } from 'antd'
import moment from 'moment'

import pick from 'lodash/pick'
import omit from 'lodash/omit'
import Table from './Table'

const formItemLayout = {
  labelCol: {
    // lg:7,
    sm: 7,
    md: 24,
    lg: 7,
  },
  wrapperCol: {
    // lg:17,
    sm: 17,
    md: 24,
    lg: 17,
  },
}

const paddingStyle = {
  left: '0',
  right: '0',
}

// const tableData = [
//   {
//     sku: '1111',
//     title: 'Sample product 1',
//     quantity: 5,
//   },
//   {
//     sku: '2222',
//     title: 'Sample product 2',
//     quantity: 6,
//   },
// ]
// {type:<Input />, key:'serviceType',label:'Service Type'},
// {type:<Input />, key:'id',label:'Id'},
// {type:<Input />, key:'masterOrderId',label:'MasterOrderId'},
// {type:<Input />, key:'activityDate',label:'ActivityDate'},
// {type:<Input />, key:'carrier',label:'Carrier'},
// {type:<Input />, key:'shipmentCreatedDate',label:'ShipmentCreatedDate'},
// {type:<Input />, key:'pickupCreatedDate',label:'PickupCreatedDate'},
// {type:<Input />, key:'pickupDateTime',label:'PickupDateTime'},
// {type:<Input />, key:'pickupClosingTime',label:'PickupClosingTime'},
// {type:<Input />, key:'dispatchDate',label:'DispatchDate'},
// {type:<Input />, key:'dispatchExpDeliveryDate',label:'DispatchExpDeliveryDate'},
// {type:<Input />, key:'dispatchStatusDetails',label:'DispatchStatusDetails'},
// {type:<Input />, key:'dispatchNotifyCustomer',label:'DispatchNotifyCustomer'},
// {type:<Input />, key:'trackingNumber',label:'TrackingNumber'},
// {type:<Input />, key:'deliveredDate',label:'DeliveredDate'},
// {type:<Input />, key:'deliveredComment',label:'DeliveredComment'},
// {type:<Input />, key:'deliveredNotifyCustomer',label:'DeliveredNotifyCustomer'},
// {type:<Input />, key:'shippedCreatedDate',label:'ShippedCreatedDate'},
// {type:<Input />, key:'trackingDetails',label:'TrackingDetails'},
// {type:<Input />, key:'shippingCharge',label:'ShippingCharge'},
// {type:<Input />, key:'extra',label:'Extra'},
// {type:<Input />, key:'cancelledDate',label:'CancelledDate'},
// {type:<Input />, key:'cancelledReason',label:'CancelledReason'},
// {type:<Input />, key:'createdByType',label:'CreatedByType'},
// {type:<Input />, key:'createdBy',label:'CreatedBy'},

const dropOffOptions = [
  {
    value: 'request-courier',
    label: 'Request courier',
  },
  {
    value: 'regular-pickup',
    label: 'Regular pickup',
  },
  {
    value: 'dropoff-station',
    label: 'Drop off at station',
  },
]

const shippingAddressFI = [
  // shippingName
  // shippingAddress1
  // shippingAddress2
  // shippingCity
  // shippingZip
  // shippingState
  // shippingCountry
  // shippingPhone
  // shippingEmail
  {
    type: <Input />,
    key: 'shippingName',
    label: 'Name',
  },
  {
    type: <Input />,
    key: 'shippingAddress1',
    label: 'Address 1',
  },
  {
    type: <Input />,
    key: 'shippingAddress2',
    label: 'Address 2',
  },
  {
    type: <Input />,
    key: 'shippingCity',
    label: 'City',
  },
  {
    type: <Input />,
    key: 'shippingZip',
    label: 'Zip',
  },
  {
    type: <Input />,
    key: 'shippingState',
    label: 'State',
  },
  {
    type: <Input />,
    key: 'shippingCountry',
    label: 'Country',
  },
  {
    type: <Input />,
    key: 'shippingPhone',
    label: 'Phone',
  },
  {
    type: <Input />,
    key: 'shippingEmail',
    label: 'Email',
  },
]

const shippingDetailsFI = [
  { type: <Input type="number" />, key: 'grossWeight', label: 'Gross Weight (in pounds)' },
  { type: <Input />, key: 'otherLogisticPartner', label: 'Logistic Partner' },
  { type: <Input />, key: 'otherTrackingUrl', label: 'Tracking URL' },
  { type: <Input />, key: 'packageDetails', label: 'PackageDetails' },
  {
    type: (
      <Select>
        {dropOffOptions.map(i => (
          <Select.Option key={i.value} value={i.value}>
            {i.label}
          </Select.Option>
        ))}
      </Select>
    ),
    key: 'dropOffType',
    label: 'Drop Off Type',
  },
  { type: <Input.TextArea />, key: 'comment', label: 'Comment' },
  { type: <Input />, key: 'trackingNumber', label: 'TrackingNumber' },
]

const pickupFI = [
  { type: <Checkbox />, key: 'isPickup', label: 'Schedule pickup' },
  {
    type: (
      <DatePicker
        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        placeholder="Select date"
      />
    ),
    key: 'pickupDateTime',
    label: 'Date & Time',
  },
  {
    type: <TimePicker placeholder="Select time" />,
    key: 'pickupClosingTime',
    label: 'Pickup Closing Time',
  },
]

const CreateShipmentForm = ({ orderId, items, assigned, formValues, onSubmit: onSubmitProp }) => {
  const context = useContext(FormContext)
  console.log('FORMDET', 'context', context)

  const initialValues = {
    items,
    grossWeight: 0,
    isPickup: false,
    ...formValues,
  }

  const originAddressFI = [
    // merchantName
    // merchantAddress1
    // merchantAddress2
    // city
    // country
    // state
    // zip
    {
      type: <Input />,
      key: 'merchantName',
      label: assigned ? 'Merchant Name' : 'Name',
    },
    {
      type: <Input />,
      key: 'merchantAddress1',
      label: assigned ? 'Merchant Address 1' : 'Address 1',
    },
    {
      type: <Input />,
      key: 'merchantAddress2',
      label: assigned ? 'Merchant Address 2' : 'Address 2',
    },
    {
      type: <Input />,
      key: 'city',
      label: 'City',
    },
    {
      type: <Input />,
      key: 'country',
      label: 'Country',
    },
    {
      type: <Input />,
      key: 'state',
      label: 'State',
    },
    {
      type: <Input />,
      key: 'zip',
      label: 'Zip',
    },
  ]

  const handleSubmitForm = vals => {
    vals.shipmentOriginDetails = pick(vals, [
      'merchantName',
      'merchantAddress1',
      'merchantAddress2',
      'city',
      'country',
      'state',
      'zip',
    ])
    vals.shipmentDestinationAddress = pick(vals, [
      'shippingName',
      'shippingAddress1',
      'shippingAddress2',
      'shippingCity',
      'shippingZip',
      'shippingState',
      'shippingCountry',
      'shippingPhone',
      'shippingEmail',
    ])
    vals.orderItems = vals.selectedItems.map(i => ({ id: i.id, quantity: i.quantity }))
    vals = omit(vals, ['selectedItems', 'items'])
    if (vals.isPickup) vals.pickupCreatedDate = new Date().toISOString()
    else vals = omit(vals, ['pickupDateTime', 'pickupClosingTime'])
    if (onSubmitProp)
      onSubmitProp({
        ...vals,
        masterOrderId: orderId,
      })
  }
  return (
    <CardWrapper
      title={`Shipment for Order ${orderId ? `#${orderId}` : ''}`}
      padding={paddingStyle}
    >
      <Form.Provider
        initialValues={initialValues}
        schema={createShipmentSchema}
        onSubmit={handleSubmitForm}
      >
        <Form.Consumer>
          {({ onSubmit }) => {
            return (
              <div className="container-fluid create-shipment-form">
                <div className="row">
                  <div className="col-md-6 border-right-lg mb-4">
                    <div className="utils__title border-bottom pb-2 mb-3">Origin Address</div>
                    <Form formItems={originAddressFI} formItemLayout={formItemLayout} />
                  </div>
                  <div className="col-md-6">
                    <div className="utils__title border-bottom pb-2 mb-3">Shipping Address</div>
                    <Form formItems={shippingAddressFI} formItemLayout={formItemLayout} />
                  </div>
                </div>
                <hr />
                <div>
                  <div className="utils__title border-bottom pb-2 mb-3">Select Order Items</div>
                  <Table data={items} isSelectable />
                </div>
                <hr />
                <div className="row border pt-4 pb-4">
                  <div className="col-md-6 border-right-lg">
                    <Form formItems={shippingDetailsFI} formItemLayout={formItemLayout} />
                  </div>
                  <div className="col-md-6">
                    <div className="utils__title border-bottom pb-2 mb-3">Pickup details</div>
                    <Form formItems={pickupFI} formItemLayout={formItemLayout} />
                  </div>
                </div>
                <Button type="primary" onClick={onSubmit} className="mt-4">
                  Create Shipment
                </Button>
              </div>
            )
          }}
        </Form.Consumer>
      </Form.Provider>
    </CardWrapper>
  )
}

CreateShipmentForm.defaultProps = {
  assigned: false,
}

export default CreateShipmentForm
