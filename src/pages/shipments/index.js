import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getFormattedDate } from '../../utils'
import data from './data.json'
import styles from './style.module.scss'

class Shipments extends React.Component {
  state = {
    loading: true,
    shipmentsData: '',
  }

  componentDidMount() {
    this.setState({ shipmentsData: data.data, loading: false })
  }

  render() {
    const { shipmentsData, loading } = this.state

    if (loading) return <div>Loading</div>
    const columns = [
      // return_id
      // order_id
      // user.name
      // quantity
      // action
      // status
      // date
      {
        title: 'Shipment ID',
        dataIndex: 'shipment_id',
        key: 'shipment_id',
        render: (text, record) => <Link to={`/shipment/view/${record.shipment_id}`}>#{text}</Link>,
        sorter: (a, b) => a.shipment_id - b.shipment_id,
        // fixed: 'left',
        width: 100,
      },

      {
        title: 'Date created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
        render: text => getFormattedDate(text),
      },
      {
        title: 'Customer',
        dataIndex: 'order.user.name',
        key: 'customer_name',
        sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      },
      {
        title: 'Origin',
        dataIndex: 'shipment_origin.address',
        key: 'origin',
        render: (text, record) => {
          return (
            <ul className={styles.listNoBullet}>
              <li>{record.shipment_origin.address}</li>
              <li>{record.shipment_origin.pincode}</li>
              <li>{record.shipment_origin.city}</li>
              <li>{record.shipment_origin.state}</li>
            </ul>
          )
        },
      },
      {
        title: 'Destination',
        dataIndex: 'order.shipping_address.address',
        key: 'destination',
        render: (text, record) => {
          return (
            <ul className={styles.listNoBullet}>
              <li>{record.order.shipping_address.address}</li>
              <li>{record.order.shipping_address.pincode}</li>
              <li>{record.order.shipping_address.city}</li>
              <li>{record.order.shipping_address.state}</li>
            </ul>
          )
        },
      },
      {
        title: 'Quantity',
        dataIndex: 'products[0].quantity',
        key: 'quantity',
        render: () => '2',
      },
      {
        title: 'Logistic partner',
        dataIndex: 'shipping_agency',
        key: 'shipping_agency',
        sorter: (a, b) => a.shipping_agency.localeCompare(b.shipping_agency),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
      },
    ]

    console.log(shipmentsData)
    return (
      <>
        <Helmet title="Shipment Details" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Shipping info</strong>
            </div>
          </div>
          <div className="card-body">
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={columns}
              dataSource={shipmentsData}
              pagination
              rowKey={record => record.shipment_id}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Shipments
