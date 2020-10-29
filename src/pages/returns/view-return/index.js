import React from 'react'
// import { Icon, Form, Input, Button, Switch, Select } from 'antd'
import { Icon, Table } from 'antd'
import { Link } from 'react-router-dom'
import { LINKS } from '_constants'
import returnsData from '../data.json'
// import valuesJson from '../values.json'
import styles from '../style.module.scss'
// import { getFormattedDate, getFormattedTime } from '../../../utils'

const DescriptionListItem = ({ item, obj }) => {
  console.log(item, obj)
  return (
    <div className="row">
      <dt className="col-lg-5">{item.title}</dt>
      <dd className="col-lg-7">{item.dataIndex.split('.').reduce((o, i) => o[i], obj)}</dd>
    </div>
  )
}

const Details = ({ data, rows }) => {
  return <DescriptionList rows={rows} dataSource={data} />
}

const DescriptionList = ({ rows, dataSource }) => {
  const elements = rows.map(item => (
    <DescriptionListItem obj={dataSource} key={item.key} item={item} />
  ))
  return <dl className="column">{elements}</dl>
}

const returnListRows = [
  {
    title: 'Return ID',
    key: 'return_id',
    dataIndex: 'return_id',
  },
  {
    title: 'Order ID',
    key: 'order_id',
    dataIndex: 'order_id',
  },
  {
    title: 'Customer',
    key: 'username',
    dataIndex: 'user.name',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
  },
]

const productColumns = [
  {
    title: 'Product ID',
    dataIndex: 'product_id',
    render: (text, record) => (
      <Link className="utils__link--underlined" to={`${LINKS.editProduct}/${record.product_id}`}>
        <div className="thumbnail-area">
          {' '}
          <img src={record.img} alt="" />
        </div>
        {`#${text}`}
      </Link>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
  },
]

class Order extends React.Component {
  state = {
    returnData: '',
    // orderStatusValues: '',
    loading: true,
  }

  componentDidMount() {
    // this.setState({loading: true })
    const { match } = this.props
    const { params } = match
    let { id } = params
    id = parseInt(id, 10)
    console.log(returnsData.data)
    const returnData = returnsData.data.find(item => item.return_id === id)
    console.log(match)
    console.log(typeof id, id)
    console.log(returnData)
    this.setState({ returnData, loading: false })
  }

  render() {
    const { returnData, loading } = this.state
    if (loading) return <div>Loading...</div>
    const size = 4

    const res = returnListRows.reduce((acc, curr, i) => {
      if (!(i % size)) {
        // if index is 0 or can be divided by the `size`...
        acc.push(returnListRows.slice(i, i + size)) // ..push a chunk of the original array to the accumulator
      }
      return acc
    }, [])

    console.log(res)

    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <Icon className={styles.icon} type="shopping-cart" />
                <strong>Return Details</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-xs-12">
                  <Details rows={res[0]} data={returnData} />
                </div>
                <div className="col-lg-6 col-xs-12">
                  <Details rows={res[1]} data={returnData} />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <Icon className={styles.icon} type="shopping-cart" />
                <strong>Products ordered</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <Table
                    className="utils__scrollTable"
                    scroll={{ x: '100%' }}
                    columns={productColumns}
                    dataSource={returnData.products}
                    rowKey={record => record.product_id}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
