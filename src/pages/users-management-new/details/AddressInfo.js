import React from 'react'
import { Descriptions } from 'antd'
import { user } from './data.json'

const UserInfo = () => {
  return (
    <div>
      <div className="container">
        <div className="utils__title">
          <strong>Billing Info</strong>
        </div>
        <Descriptions column={2} className="descr-info">
          <Descriptions.Item label="Address 1">{user.billing.address1}</Descriptions.Item>
          <Descriptions.Item label="Address 2">{user.billing.address2}</Descriptions.Item>
          <Descriptions.Item label="State">{user.billing.state}</Descriptions.Item>
          <Descriptions.Item label="Country">{user.billing.country}</Descriptions.Item>
          <Descriptions.Item label="City">{user.billing.city}</Descriptions.Item>
          <Descriptions.Item label="Pincode">{user.billing.pincode}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="container">
        <div className="utils__title">
          <strong>Shipping Info</strong>
        </div>
        <p>{user.shipping.address}</p>
      </div>
    </div>
  )
}

export default UserInfo
