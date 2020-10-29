import React, { useState } from 'react'
import CardWrapper from 'components/CardWrapper'
import { Tabs } from 'antd'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL, LINKS } from '_constants'
import Loader from 'components/LayoutComponents/Loader'
import Redirect from 'react-router-dom/Redirect'
import NotFound from 'pages/404'
import { createShipment } from 'services/shipments'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import CreateShipmentForm from './CreateShipmentForm'

const ShipmentFormAdmin = ({ orderId }) => {
  const url = `${CATALOG_API_URL.unshippedItems}/${orderId}`
  const [{ response, loading, error, refetch }] = useFetching(url)
  const [isCreated, setCreated] = useState(false)

  const handleSubmit = async values => {
    const res = await createShipment(values, orderId)
    if (res && res.data) setCreated(true)
  }

  // if (isCreated) {
  //   setCreated(false);
  //   refetch()
  // }
  if (isCreated) {
    // notification.success(STRINGS.editSuccess)
    return <Redirect to={`${LINKS.viewEditOrder}/${orderId}`} />
  }
  if (loading) return <Loader />
  if (error)
    return <NotFound title="Error!" subtitle={error ? error.message : 'Something went wrong'} />
  console.log(response, error, refetch)
  if (response && response.data) {
    const { data } = response
    // const sample = data.unassigned.length > 0 ? data.unassigned : [];
    // if (sample.length > 0)

    // // need to change address format in node, website
    // console.log('CONDITION',data.order_master && data.order_master.user && data.order_master.shippingAddress)
    // console.log('CONDITION',data.order_master,data.order_master.user,data.order_master.shippingAddress)
    let shippingAddressA = {}
    if (data.master_order && data.master_order.user && data.master_order.shippingAddress) {
      const { user, shippingAddress } = data.master_order
      // fullName
      // mobileNo
      // houseNo
      // street
      // landmark
      // city
      // state
      // pincode
      shippingAddressA = {
        shippingName: shippingAddress.fullName,
        shippingAddress1: `${shippingAddress.houseNo} ${shippingAddress.street} ${shippingAddress.landmark}`,
        shippingAddress2: '',
        shippingCity: shippingAddress.city,
        shippingZip: shippingAddress.state,
        shippingState: shippingAddress.pincode,
        shippingCountry: 'India',
        shippingPhone: shippingAddress.mobileNo,
        shippingEmail: user.email,
      }
    }

    let assigned = []
    if (data.assigned && data.assigned.length > 0) {
      assigned = groupBy(data.assigned, 'merchantassigned.merchant.id')
    }

    const getShippingAddressVals = id => {
      console.log(id, assigned[id].merchantassigned)
      return {
        ...shippingAddressA,
        merchantName:
          assigned[id] &&
          assigned[id].length &&
          assigned[id][0].merchantassigned &&
          assigned[id][0].merchantassigned.merchant.name,
        merchantAddress1:
          assigned[id] &&
          assigned[id].length &&
          assigned[id][0].merchantassigned &&
          assigned[id][0].merchantassigned.merchant.address,
      }
    }
    console.log('assigned', assigned)

    const getTabText = text => {
      console.log('gettabtext', text)
      return (
        <div>
          Merchant: <span>{text}</span>
        </div>
      )
    }

    return (
      <CardWrapper>
        <Tabs className="shipment-tabs">
          <Tabs.TabPane tab="Unassigned Orders" key="1">
            <CreateShipmentForm
              items={data.unassigned}
              orderId={orderId}
              formValues={shippingAddressA}
              onSubmit={handleSubmit}
            />
          </Tabs.TabPane>
          {!isEmpty(assigned) && (
            <Tabs.TabPane tab="Assigned Orders" key="2">
              <Tabs tabPosition="left">
                {map(assigned, (value, key) => {
                  console.log('assigned value', value)
                  return (
                    <Tabs.TabPane
                      tab={getTabText(
                        value[0].merchantassigned && value[0].merchantassigned.merchant
                          ? value[0].merchantassigned.merchant.name
                          : '',
                      )}
                      key={key}
                    >
                      <CreateShipmentForm
                        items={value}
                        orderId={orderId}
                        formValues={getShippingAddressVals(key)}
                        onSubmit={handleSubmit}
                      />
                    </Tabs.TabPane>
                  )
                })}
              </Tabs>
              {/* <Tabs tabPosition="left">
                 <CreateShipmentForm
                   items={data.assigned}
                   orderId={orderId}
                   assigned
                   formValues={shippingAddressA}
                 />
               </Tabs> */}
            </Tabs.TabPane>
          )}
        </Tabs>
      </CardWrapper>
    )
  }
  return null
}

export default ShipmentFormAdmin
