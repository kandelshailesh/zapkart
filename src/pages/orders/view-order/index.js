import React from 'react'
import { Icon, Table, Form, Input, Button, Switch, Select, Steps } from 'antd'
// import { Link } from 'react-router-dom'
import ordersData from '../data.json'
import valuesJson from '../values.json'
import styles from '../style.module.scss'
import { getFormattedDate, getFormattedTime } from '../../../utils'

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const { Step } = Steps

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields (props) {
    console.log(props)
    return {
      history_id: Form.createFormField({
        ...props.history_id,
        value: props.history_id.value
      }),
      date_added: Form.createFormField({
        ...props.date_added,
        value: props.date_added.value
      }),
      comments: Form.createFormField({
        ...props.comments,
        value: props.comments.value
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value
      }),
      customer_notify: Form.createFormField({
        ...props.customer_notify,
        value: props.customer_notify.value
      })
    }
  },
  onValuesChange (_, values) {
    console.log(values)
  }
})(props => {
  console.log(props)
  const {
    getFieldDecorator
    // getFieldValue
  } = props.form

  return (
    <Form onSubmit={props.onSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
          <FormItem label='Status'>
            {getFieldDecorator('status')(
              <Select id='status' placeholder='Select status'>
                {valuesJson.order_status.map(item => (
                  <Option key={item.key} value={item.value}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem label='Notify customer'>
            {getFieldDecorator('customer_notify')(<Switch />)}
          </FormItem>
        </div>

        <div className='col-lg-6'>
          <FormItem label='Comments'>
            {getFieldDecorator('comments')(
              <TextArea rows={6} placeholder='Comments' />
            )}
          </FormItem>
        </div>
      </div>

      <FormItem>
        <Button
          htmlType='submit'
          className='mr-2'
          type='primary'
          style={{ width: 200 }}
        >
          <i className='fa fa-send mr-2' />
          Submit
        </Button>
      </FormItem>
    </Form>
  )
})

const orderRows = [
  {
    key: 1,
    title: 'Order ID',
    dataIndex: 'id',
    render: text => <a href='#'>{text}</a>
  },
  {
    key: 2,
    title: 'Customer',
    dataIndex: 'user.name',
    render: text => <a href='#'>{text}</a>
  },
  { key: 3, title: 'Email', dataIndex: 'user.email' },
  {
    key: 4,
    title: 'Order date',
    dataIndex: 'created_at'
    // render: text => <a href='#'>{text}</a>
  },
  { key: 5, title: 'Order status', dataIndex: 'status' },
  { key: 6, title: 'Payment status', dataIndex: 'payment.status' },
  { key: 7, title: 'Payment method', dataIndex: 'payment.payment_method' }
]

// const productTableColumns = [
//   {
//     title: 'Brand',
//     dataIndex: 'brand.brand_name',
//     render: text => {
//       console.log(text)
//       return text
//     }
//   },
//   {
//     title: 'SKU',
//     dataIndex: 'sku',
//     render: text => {
//       console.log(text)
//       return text
//     }
//   },
//   {
//     title: 'Title',
//     dataIndex: 'name',

//     sorter: (a, b) => a.name - b.name,
//     render: (text, record) => (
//       <Link to={`/catalog/products/${record.product_id}`}>{text}</Link>
//     )
//   },
//   {
//     title: 'Price',
//     dataIndex: 'price'
//   },
//   {
//     title: 'Quantity',
//     dataIndex: 'quantity'
//   },
//   {
//     title: 'Current shipment status',
//     dataIndex: 'shipment.status'
//   }
// ]
const orderHistoryColumns = [
  {
    title: 'Date added',
    dataIndex: 'date_added',
    render: (text, record) =>
      `${getFormattedDate(record.date_added)} ${getFormattedTime(
        record.date_added
      )}`
  },
  {
    title: 'Comments',
    dataIndex: 'comments'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Notified customer',
    dataIndex: 'customer_notify',
    render: (text, record) => {
      return (
        record.customer_notify && (
          <span className='badge badge-primary badge-collapsed-hidden ml-2 center'>
            Notified
          </span>
        )
      )
    }
  }
]

// const getShippingListData = shipping => {
//   console.log(Object.entries(shipping))
//   // console.log(Object.entries(shipping).reduce(item => `title: ${item}`))

//   return [
//     {
//       title: 'Title 1'
//     },
//     {
//       title: 'Title 2'
//     },
//     {
//       title: 'Title 3'
//     },
//     {
//       title: 'Title 4'
//     }
//   ]
// }
const DescriptionListItem = ({ item, obj }) => {
  return (
    <div className='row'>
      <dt className='col-lg-5 col-md-6 col-sm-6 order-head'>{item.title}</dt>
      <dd className='col-lg-7 col-md-6 col-sm-6'>
        {item.dataIndex.split('.').reduce((o, i) => o[i], obj)}
      </dd>
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
  return <dl className='column'>{elements}</dl>
}

const SimpleList = ({ data }) => {
  // console.log(data instanceof Array)
  // eslint-disable-next-line dot-notation
  data.map(item => console.log(item['title']))
  return (
    <dl>
      {data.map(item => (
        <dd key={item.key}>{item.value}</dd>
      ))}
    </dl>
  )
}

class Order extends React.Component {
  state = {
    // orderStatusValues: '',
    order: '',
    // orderHistory: [],
    shippingAddress: '',
    fields: {
      history_id: {
        value: ''
      },
      date_added: {
        value: ''
      },
      comments: {
        value: ''
      },
      status: {
        value: ''
      },
      customer_notify: {
        value: true
      }
    }
    // loading: false
  }

  componentDidMount () {
    // this.setState({loading: true })
    const { match } = this.props
    const { params } = match
    let { id } = params
    id = parseInt(id, 10)
    console.log(match)
    console.log(typeof id, id)
    const orders = ordersData.data
    const order = orders.find(item => item.id === id)
    console.log(order)

    const objectArray = Object.entries(order.shipping_address)
    const shippingAddress = objectArray.map(([key, val], index) =>
      Object.assign({}, { title: key, value: val, key: index })
    )

    this.setState({
      order,
      shippingAddress
      // orderStatusValues:valuesJson.order_status
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submitting form')
    const { fields, order } = this.state
    console.log(fields)
    const historyItem = {
      history_id:
        order.history.sort((a, b) => b.history_id - a.history_id)[0]
          .history_id + 1,
      date_added: new Date().toISOString(),
      comments: fields.comments.value,
      status: fields.status.value,
      customer_notify: fields.customer_notify.value
    }
    // const newHistory = [...order.history, historyItem]
    this.setState({
      order: { ...order, history: [...order.history, historyItem] }
    })
  }

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }))
    const { fields } = this.state
    console.log(fields)
  }

  render () {
    const { order, shippingAddress, fields } = this.state
    if (order === '') return <div>Loading</div>
    console.log(shippingAddress instanceof Array)

    const shippingAddr = Object.entries(order.shipping_address).map(
      ([key, val], index) =>
        Object.assign({}, { title: key, value: val, key: index })
    )

    const billingAddr = Object.entries(order.billing_address).map(
      ([key, val], index) =>
        Object.assign({}, { title: key, value: val, key: index })
    )

    const { products, history } = order
    console.log(history)
    // const subtotal = products.reduce((item1, item2) => {
    //   console.log('hi')
    //   console.log(item1.price * item1.quantity + item2.price * item2.quantity)
    //   console.log('hi')
    //   return item1.price * item1.quantity + item2.price * item2.quantity
    // })

    // const subtotal = products.reduce(
    //   (sum, current) =>
    //     sum.quantity * sum.price + current.quantity * current.price,
    //   0
    // )
    // const subtotal = 15

    // const totalAmt = subtotal + order.tax + order.shipping - order.discount
    console.log(products)

    // const shippingAddress = Object.values(order.shipping_address)
    // const shippingRows = getShippingListData(order.shipping_address)
    // console.log(shippingRows)

    // console.log(Object.entries(order.shipping_address))

    console.log(order.user.name)
    return (
      <>
        <div className='row view-order-cards'>
          <div className='col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Order Details</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <Details rows={orderRows} data={order} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Shipping info</strong>
                </div>
                {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-xl-12'>
                    {console.log(shippingAddr, shippingAddr instanceof Array)}
                    <SimpleList data={shippingAddr} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Billing info</strong>
                </div>
                {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <SimpleList data={billingAddr} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Products ordered</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='order-single-table'>
                  <div className='order-single-table-header'>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <div className='order-id-wrapper'>
                          <span className='order-id'>OD115560819860227000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single product details */}
                  <div className='order-single-table-content'>
                    <div className='row'>
                      <div className='col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6'>
                        <div className='ordered-product-img'>
                          <img
                            src='https://img1a.flixcart.com/image/75/75/jsrtn680/car-cover/3/t/7/harrff7ier1929074-fit-fly-original-imafe9hhhmngskea.jpeg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-xl-3 col-lg-7 col-md-7 col-sm-7 ordered-product-details-wrapper'>
                        <div className='ordered-product-details'>
                          <h5 className='ordered-product-head'>
                            Fit Fly Car Cover For Tata Harrier
                          </h5>
                          <h6 className='ordered-product-id'>OD1155608</h6>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-12 steps-ordered-wrapper'>
                        <div className='steps-ordered-product'>
                          <Steps size='small' current={1}>
                            <Step title='Processing' description='' />
                            <Step
                              title='Dispatched'
                              description='Item dispatched to shipment hub'
                            />
                            <Step title='Shipped' description='Item shipped' />
                            <Step
                              title='Delivered'
                              description='Item delivered'
                            />
                          </Steps>
                        </div>
                      </div>
                      <div className='col-xl-2 col-lg-3 col-md-3 col-sm-3 col-6 ordered-product-price-wrapper'>
                        <h3 className='ordered-product-price'>₹1,900/-</h3>
                      </div>
                    </div>
                  </div>
                  {/* Single product details */}
                  {/* Single product details */}
                  <div className='order-single-table-content'>
                    <div className='row'>
                      <div className='col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6'>
                        <div className='ordered-product-img'>
                          <img
                            src='https://img1a.flixcart.com/image/75/75/jsrtn680/car-cover/3/t/7/harrff7ier1929074-fit-fly-original-imafe9hhhmngskea.jpeg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-xl-3 col-lg-7 col-md-7 col-sm-7 ordered-product-details-wrapper'>
                        <div className='ordered-product-details'>
                          <h5 className='ordered-product-head'>
                            Fit Fly Car Cover For Tata Harrier
                          </h5>
                          <h6 className='ordered-product-id'>OD1155608</h6>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-12 steps-ordered-wrapper'>
                        <div className='steps-ordered-product'>
                          <Steps size='small' current={2}>
                            <Step title='Processing' description='' />
                            <Step
                              title='Dispatched'
                              description='Item dispatched to shipment hub'
                            />
                            <Step title='Shipped' description='Item shipped' />
                            <Step
                              title='Delivered'
                              description='Item delivered'
                            />
                          </Steps>
                        </div>
                      </div>
                      <div className='col-xl-2 col-lg-3 col-md-3 col-sm-3 col-6 ordered-product-price-wrapper'>
                        <h3 className='ordered-product-price'>₹1,900/-</h3>
                      </div>

                    </div>
                  </div>
                  {/* Single product details */}
                  {/* Single product details */}
                  <div className='order-single-table-content'>
                    <div className='row'>
                      <div className='col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6'>
                        <div className='ordered-product-img'>
                          <img
                            src='https://img1a.flixcart.com/image/75/75/jsrtn680/car-cover/3/t/7/harrff7ier1929074-fit-fly-original-imafe9hhhmngskea.jpeg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-xl-3 col-lg-7 col-md-7 col-sm-7 ordered-product-details-wrapper'>
                        <div className='ordered-product-details'>
                          <h5 className='ordered-product-head'>
                            Fit Fly Car Cover For Tata Harrier
                          </h5>
                          <h6 className='ordered-product-id'>OD1155608</h6>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-12 steps-ordered-wrapper'>
                        <div className='steps-ordered-product'>
                          <Steps size='small' current={3}>
                            <Step title='Processing' description='' />
                            <Step
                              title='Dispatched'
                              description='Item dispatched'
                            />
                            <Step title='Shipped' description='Item shipped' />
                            <Step
                              title='Delivered'
                              description='Item delivered'
                            />
                          </Steps>
                        </div>
                      </div>
                      <div className='col-xl-2 col-lg-3 col-md-3 col-sm-3 col-6 ordered-product-price-wrapper'>
                        <h3 className='ordered-product-price'>₹1,900/-</h3>
                      </div>
                    </div>
                  </div>
                  {/* Single product details */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Order history</strong>
                </div>
                <div className='utils__titleDescription'>Order history</div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <Table
                      className='utils__scrollTable'
                      scroll={{ x: '100%' }}
                      columns={orderHistoryColumns}
                      dataSource={history}
                      rowKey={record => record.history_id}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              <div className='card-header'>
                <div className='utils__title'>
                  <Icon className={styles.icon} type='shopping-cart' />
                  <strong>Add order history</strong>
                </div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <CustomizedForm
                      {...fields}
                      onChange={this.handleFormChange}
                      onSubmit={this.handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Order
