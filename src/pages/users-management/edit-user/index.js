import React from 'react'
import { Button, Tabs } from 'antd'

import { Helmet } from 'react-helmet'
import GeneralForm from './GeneralForm'
import AddressForm from './AddressForm'
import usersJSON from '../data.json'

const { TabPane } = Tabs

const onChangeTab = a => {
  console.log(a)
}

class EditUser extends React.Component {
  state = {
    userData: '',
    users: usersJSON.data,
    fieldsGeneral: {
      name: {
        title: 'Name',
        value: ''
      },
      email: {
        title: 'Email',
        value: ''
      },
      phoneno: {
        title: 'Phone no',
        value: ''
      },
      gender: {
        title: 'Gender',
        value: ''
      },
      status: {
        title: 'Status',
        value: ''
      }
    },
    fieldsAddress: {
      address: {
        title: 'Address',
        value: ''
      },
      pincode: {
        title: 'Pincode',
        value: ''
      },
      city: {
        title: 'City',
        value: ''
      },
      state: {
        title: 'State',
        value: ''
      }
    }
  }

  componentDidMount() {
    // this.props.match.params
    const { users, fieldsGeneral, fieldsAddress } = this.state
    const { match } = this.props
    const { params } = match
    const { id } = params
    const user = users.find(item => item.id === parseInt(id, 10))
    console.log(user)
    const address = user.address[0]
    this.setState({
      userData: user,
      fieldsGeneral: {
        name: {
          ...fieldsGeneral.name,
          value: user.name
        },
        email: {
          ...fieldsGeneral.email,
          value: user.email
        },
        phoneno: {
          ...fieldsGeneral.phoneno,
          value: user.phoneno
        },
        gender: {
          ...fieldsGeneral.gender,
          value: user.gender
        },
        status: {
          ...fieldsGeneral.status,
          value: user.status
        }
      },
      fieldsAddress: {
        address: {
          ...fieldsAddress.address,
          value: address.address
        },
        pincode: {
          ...fieldsAddress.pincode,
          value: address.pincode
        },
        city: {
          ...fieldsAddress.city,
          value: address.city
        },
        state: {
          ...fieldsAddress.state,
          value: address.state
        }
      }
    })
  }

  handleGeneralFormChange = changedFields => {
    this.setState(({ fieldsGeneral }) => ({
      fieldsGeneral: { ...fieldsGeneral, ...changedFields }
    }))
  }

  handleAddressFormChange = changedFields => {
    this.setState(({ fieldsAddress }) => ({
      fieldsAddress: { ...fieldsAddress, ...changedFields }
    }))
  }

  render() {
    const { fieldsGeneral, fieldsAddress, userData } = this.state
    return (
      <>
        <Helmet title="Edit user" />
        <div className='card'>
          <div className='card-body'>
            {/* <h4 className='text-black mb-3'>
              <strong>Main Parameters</strong>
            </h4> */}
            <Tabs
              onChange={onChangeTab}
              tabBarExtraContent={
                <Button onClick={this.handleSubmit}>Submit</Button>
              }
            >
              <TabPane
                tab={
                  <h5>
                    <strong>General</strong>
                  </h5>
                }
                key='1'
              >
                <Tabs tabPosition='left'>
                  <TabPane
                    tab={
                      <h6>
                        <strong>General</strong>
                      </h6>
                    }
                    key='1.1'
                  >
                    {userData !== 'undefined' && (
                      <GeneralForm
                        {...fieldsGeneral}
                        onChange={this.handleGeneralFormChange}
                      />
                    )}
                  </TabPane>
                  <TabPane
                    tab={
                      <h6>
                        <strong>Address 1</strong>
                      </h6>
                    }
                    key='1.2'
                  >
                    <AddressForm
                      {...fieldsAddress}
                      onChange={this.handleAddressFormChange}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <h6>
                        <strong>Address 2</strong>
                      </h6>
                    }
                    key='1.3'
                  >
                    address 2
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane
                tab={
                  <h5>
                    <strong>Orders</strong>
                  </h5>
                }
                key='2'
              >
                orders
              </TabPane>
              <TabPane
                tab={
                  <h5>
                    <strong>IP Addresses</strong>
                  </h5>
                }
                key='3'
              >
                Tab 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    )
  }
}

export default EditUser
