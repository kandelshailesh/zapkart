import React from 'react'
import { Table } from 'antd'

const ShipmentOrder = ({ orderId }) => {
  console.log(orderId, 'fetching shipments of orderId')
  return (
    <div>
      <Table />
    </div>
  )
}

export default ShipmentOrder
