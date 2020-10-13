import React from 'react'
import { Button, Tabs } from 'antd'
import { Helmet } from 'react-helmet'

import UserForm from './UserForm'
import AddressForm from './AddressForm'
// import TotalsForm from './TotalsForm'

import ordersJSON from '../data.json'

const { TabPane } = Tabs

class EditUser extends React.Component {
  state = {
    // orderData: '',
    orders: ordersJSON.data,
    fieldsCustomer: {
      name: {
        title: 'Name',
        value: '',
      },
      email: {
        title: 'Email',
        value: '',
      },
      phoneno: {
        title: 'Phone No',
        value: '',
      },
    },
    fieldsShippingAddress: {
      address: {
        title: 'Address',
        value: '',
      },
      pincode: {
        title: 'Pincode',
        value: '',
      },
      city: {
        title: 'City',
        value: '',
      },
      state: {
        title: 'State',
        value: '',
      },
    },
    fieldsBillingAddress: {
      address: {
        title: 'Address',
        value: '',
      },
      pincode: {
        title: 'Pincode',
        value: '',
      },
      city: {
        title: 'City',
        value: '',
      },
      state: {
        title: 'State',
        value: '',
      },
    },
  }

  componentDidMount() {
    // this.props.match.params
    const { orders, fieldsCustomer, fieldsShippingAddress, fieldsBillingAddress } = this.state
    const { match } = this.props
    const { params } = match
    const { id } = params
    const order = orders.find(item => item.id === parseInt(id, 10))
    // eslint-disable-next-line camelcase
    const { user, shipping_address, billing_address } = order

    // console.log(order)
    // const address = user.address[0]
    this.setState({
      // order: order,
      fieldsCustomer: {
        name: {
          ...fieldsCustomer.name,
          value: user.name,
        },
        email: {
          ...fieldsCustomer.email,
          value: user.email,
        },
        phoneno: {
          ...fieldsCustomer.phoneno,
          value: user.phoneno,
        },
      },
      fieldsShippingAddress: {
        address: {
          ...fieldsShippingAddress.address,
          value: shipping_address.address,
        },
        pincode: {
          ...fieldsShippingAddress.pincode,
          value: shipping_address.pincode,
        },
        city: {
          ...fieldsShippingAddress.city,
          value: shipping_address.city,
        },
        state: {
          ...fieldsShippingAddress.state,
          value: shipping_address.state,
        },
      },
      fieldsBillingAddress: {
        address: {
          ...fieldsBillingAddress.address,
          value: billing_address.address,
        },
        pincode: {
          ...fieldsBillingAddress.pincode,
          value: billing_address.pincode,
        },
        city: {
          ...fieldsBillingAddress.city,
          value: billing_address.city,
        },
        state: {
          ...fieldsBillingAddress.state,
          value: billing_address.state,
        },
      },
    })
  }

  onChangeTab = a => {
    console.log(a)
  }

  handleGeneralFormChange = changedFields => {
    this.setState(({ fieldsCustomer }) => ({
      fieldsCustomer: { ...fieldsCustomer, ...changedFields },
    }))
  }

  handleAddressFormChange = changedFields => {
    this.setState(({ fieldsShippingAddress }) => ({
      fieldsShippingAddress: { ...fieldsShippingAddress, ...changedFields },
    }))
  }

  handleAddressFormChange = changedFields => {
    this.setState(({ fieldsBillingAddress }) => ({
      fieldsBillingAddress: { ...fieldsBillingAddress, ...changedFields },
    }))
  }

  render() {
    const {
      fieldsCustomer,
      fieldsShippingAddress,
      fieldsBillingAddress,
      // userData
    } = this.state
    return (
      <>
        <Helmet title="Edit Order" />
        <div className="card">
          <div className="card-body">
            {/* <h4 className='text-black mb-3'>
              <strong>Main Parameters</strong>
            </h4> */}
            <Tabs
              onChange={this.onChangeTab}
              tabBarExtraContent={<Button onClick={this.handleSubmit}>Submit</Button>}
            >
              <TabPane
                tab={
                  <h5>
                    <strong>Customer details</strong>
                  </h5>
                }
                key="1"
              >
                <UserForm {...fieldsCustomer} />
              </TabPane>
              <TabPane
                tab={
                  <h5>
                    <strong>Products</strong>
                  </h5>
                }
                key="2"
              >
                Products
              </TabPane>

              <TabPane
                tab={
                  <h5>
                    <strong>Address</strong>
                  </h5>
                }
                key="3"
              >
                <Tabs tabPosition="left">
                  <TabPane
                    tab={
                      <h6>
                        <strong>Shipping address</strong>
                      </h6>
                    }
                    key="3.1"
                  >
                    <AddressForm
                      {...fieldsShippingAddress}
                      onChange={this.handleAddressFormChange}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <h6>
                        <strong>Billing address</strong>
                      </h6>
                    }
                    key="3.2"
                  >
                    <AddressForm
                      {...fieldsBillingAddress}
                      onChange={this.handleAddressFormChange}
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane
                tab={
                  <h5>
                    <strong>Orders</strong>
                  </h5>
                }
                key="4"
              >
                orders
              </TabPane>
              <TabPane
                tab={
                  <h5>
                    <strong>Totals</strong>
                  </h5>
                }
                key="5"
              >
                Totals
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    )
  }
}

export default EditUser
