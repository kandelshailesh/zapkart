/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react'
// import Query from 'components/Query'
import { Button, Modal, Empty, Icon } from 'antd'
import { connect } from 'react-redux'
import { CATALOG_API_URL, LINKS } from '_constants'
import useFetching from 'hooks/useFetching'
import classNames from 'classnames'
import DescriptionList from 'components/DescriptionList'
import { Helmet } from 'react-helmet'
import Link from 'react-router-dom/Link'
import NotFound from 'pages/404'
import Loader from 'components/LayoutComponents/Loader'
import {
  editOrder,
  editOrderItem,
  addOrderItem,
  deleteOItemMerchant,
  assignOItemMerchant,
} from 'services/orders'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'

import find from 'lodash/find'
import CardWrapper from 'components/CardWrapper'
// import { getFileExtension } from 'utils'
import { getFileExtension } from 'utils'
import {
  OrderedProductsList,
  OrderAddressForm,
  OrderedItemsTable,
  OrderStatusForm,
  // OrderHistory,
  OrderHistoryTable,
} from '../components'
import styles from './styles.module.scss'
// import OrderHistory from '../components/OrderHistory'

// const orderRows = [
//   {
//     key: 1,
//     title: 'Order ID',
//     dataIndex: 'id',
//     render: text => <a href="#">{text}</a>,
//   },
//   {
//     key: 2,
//     title: 'Customer',
//     dataIndex: 'user.name',
//     render: text => <a href="#">{text}</a>,
//   },
//   { key: 3, title: 'Email', dataIndex: 'user.email' },
//   {
//     key: 4,
//     title: 'Order date',
//     dataIndex: 'created_at',
//     // render: text => <a href='#'>{text}</a>
//   },
//   { key: 5, title: 'Order status', dataIndex: 'status' },
//   { key: 6, title: 'Payment status', dataIndex: 'payment.status' },
//   { key: 7, title: 'Payment method', dataIndex: 'payment.payment_method' },
// ]

// const DescriptionListItem = ({ item, obj }) => {
//   return (
//     <div className="row">
//       <dt className="col-lg-5 col-md-6 col-sm-6 order-head text-right">{item.title}</dt>
//       <dd className="col-lg-7 col-md-6 col-sm-6">
//         {item.dataIndex.split('.').reduce((o, i) => o[i], obj)}
//       </dd>
//     </div>
//   )
// }

// const Details = ({ data, rows }) => {
//   return <DescriptionList rows={rows} dataSource={data} />
// }

// const DescriptionList = ({ rows, dataSource }) => {
//   const elements = rows.map(item => (
//     <DescriptionListItem obj={dataSource} key={item.key} item={item} />
//   ))
//   return <dl className="column">{elements}</dl>
// }

// const SimpleList = ({ data }) => {
//   // console.log(data instanceof Array)
//   // eslint-disable-next-line dot-notation

//   return (
//     <dl>
//       {Object.entries(data).map(item => (
//         <dd key={item.key}>{item.value}</dd>
//       ))}
//     </dl>
//   )
// }

const initialValues = {
  isShippingAddrModal: false,
  isBillingAddrModal: false,
  shippingAddress: {},
  billingAddress: {},
  isEdit: false,
  isShipment: false,
  isPreview: false,
  previewUrl: null,
  data: {},
}

function reducer(state, action) {
  switch (action.type) {
    case 'closeShippingForm':
      return { ...state, isShippingAddrModal: false }
    case 'closeBillingForm':
      return { ...state, isBillingAddrModal: false }
    case 'openShippingForm':
      return { ...state, isShippingAddrModal: true }
    case 'openBillingForm':
      return { ...state, isBillingAddrModal: true }
    case 'setState':
      return { ...state, ...action.payload }
    case 'editToggle':
      return { ...state, isEdit: !state.isEdit }
    case 'shipmentToggle':
      return { ...state, isShipment: !state.isShipment }
    case 'togglePreview':
      if (!state.isPreview) return { ...state, previewUrl: action.payload.url, isPreview: true }
      return { ...state, previewUrl: null, isPreview: false }
    default:
      return { ...state }
  }
}

const ViewOrder = props => {
  const { match, user } = props
  const { params: linkParams } = match

  const { orderId } = linkParams

  console.log('dddd', user)

  const url = `${CATALOG_API_URL.getOrder}/${orderId}`

  const [{ response, loading, error }] = useFetching(url)

  const [state, dispatch] = useReducer(reducer, initialValues)
  console.log(state)
  console.log(dispatch)

  // const dispatchC = (action) => {
  //   return (action) => dispatch(action)
  // }

  const setState = payload => {
    dispatch({
      type: 'setState',
      payload,
    })
  }

  const onCancelShippingModal = () => {
    dispatch({
      type: 'closeShippingForm',
    })
  }

  const onCancelBillingModal = () => {
    dispatch({
      type: 'closeBillingForm',
    })
  }

  const openBillingModal = () => {
    dispatch({
      type: 'openBillingForm',
    })
  }

  const openShippingModal = () => {
    dispatch({
      type: 'openShippingForm',
    })
  }

  const onSubmitShippingAddr = async values => {
    console.log('shipping form values', values)

    const res = await editOrder({ shippingAddress: values }, orderId)
    if (res && res.data) {
      setState({
        data: res.data,
      })
      dispatch({ type: 'closeShippingForm' })
      dispatch({
        type: 'editToggle',
      })
    }
    return true
  }
  const onSubmitBillingAddr = async values => {
    console.log('billing form values', values)

    const res = await editOrder({ billingAddress: values }, orderId)
    if (res && res.data) {
      setState({
        data: res.data,
      })
      dispatch({ type: 'closeBillingForm' })
      dispatch({
        type: 'editToggle',
      })
    }
    return true
  }

  const handleEditToggle = () => {
    dispatch({
      type: 'editToggle',
    })
  }

  // const handleShipmentToggle = () => {
  //   dispatch({
  //     type: 'shipmentToggle',
  //   })
  // }

  const handleSubmitOrder = async values => {
    console.log('use form provider in form component to submit', values)
    let vals = omit(values, ['paymentSettingId'])
    if (vals.orderStatus === 'noChange') vals = omit(vals, 'orderStatus')
    if (vals.paymentStatus === 'noChange') vals = omit(vals, 'paymentStatus')
    const res = await editOrder(vals, orderId)
    if (res && res.data) {
      dispatch({
        type: 'setState',
        payload: {
          data: res.data,
        },
      })
      dispatch({
        type: 'editToggle',
      })
    }
  }

  const onEditOrderItem = async params => {
    const { value, key, id } = params
    if (key === 'merchantId' && value === 'none') return deleteAssignedMerchant(id)
    if (key === 'merchantId' && value !== 'none') return assignMerchant(id, value)

    const res = await editOrderItem({ [key]: value }, id)
    if (res && res.data) {
      dispatch({
        type: 'setState',
        payload: {
          data: res.data,
        },
      })
      return true
    }
    return false
  }

  const deleteAssignedMerchant = async id => {
    const res = await deleteOItemMerchant({ orderItemId: id })
    if (res && res.success) return true
    return false
  }

  const assignMerchant = async (id, merchantId) => {
    const res = await assignOItemMerchant({ orderItemId: id, merchantId })
    if (res && res.success) return true
    return false
  }

  const onAddOrderItem = async params => {
    const { productId, quantity } = params
    const res = await addOrderItem({ productId, quantity }, orderId)
    if (res && res.data) {
      dispatch({
        type: 'setState',
        payload: {
          data: res.data,
        },
      })
      return true
    }
    return false
  }

  // const togglePreview = (murl) => {
  //   console.log('togglepreview before dispatch', murl)
  //   return () => {
  //     console.log('calling dispatch', murl)
  //     dispatch({
  //       type: 'togglePreview',
  //       payload: { url: murl },
  //     })
  //   }
  // }

  const closePreview = () => {
    dispatch({
      type: 'togglePreview',
    })
  }

  // const handleSubmitShipment = () => {
  //   refetch()
  // }

  useEffect(() => {
    if (response && response.data) {
      const { data } = response
      setState({
        data,
      })
    }
  }, [response])

  if (loading) return <Loader />

  if (!isEmpty(state.data)) {
    const { data } = state
    const isPresOrder = find(data.order_items, i => i.prescriptionRequired === 'yes') && true
    const canCreateShipment =
      user.userTypeId !== 3 ? find(data.order_items, i => isEmpty(i.shipping)) : ''

    const hasShipments = find(data.order_items, i => !isEmpty(i.shipping))
    const orderItems = data.order_items.map(i => ({
      image:
        i.product && i.product.images && i.product.images.length > 0
          ? i.product.images[0].thumbnail
          : null,
      sku: i.product ? i.product.sku : '',
      title: i.product ? i.product.name : '',
      price: i.price,
      quantity: i.quantity,
      minOrderQty: i.product ? i.product.minOrderQty : 1,
      prescriptionRequired: i.prescriptionRequired === 'yes',
      maxOrderQty: i.product ? i.product.maxOrderQty : null,
      subtotal: i.subtotal,
      productId: i.product ? i.product._id : '',
      id: i.id,
      slug: i.product ? i.product.slug : null,
      shipmentStatus: i.shipping && i.shipping.shipment && i.shipping.shipment.shippingStatus,
      // shipmentStatus:
      //   i.shipping && i.shipping && i.shipping.length && i.shipping.length > 0
      //     ? i.shipping.map(m => m.shipment && m.shipment.shippingStatus).toString()
      //     : null,
      assignedMerchant:
        i.merchantassigned && i.merchantassigned.merchant && i.merchantassigned.merchant.name,
      assignedMerchantStatus: i.merchantassigned && i.merchantassigned.status,
      // merchantAssignId: i.merchantassigned && i.assignedMerchant.merchantAssignId
    }))

    console.log('orderItems', orderItems)

    const orderInfoData = {
      orderNo: data.orderNo,
      customer: data.user ? data.user.firstName + data.user.lastName : '',
      email: data.user ? data.user.email : '',
      currentOrderStatus: data.orderStatus,
      paymentType: data.paymentType,
      currentPaymentStatus: data.paymentStatus,
    }

    const orderStatusInfo = {
      paymentMethod: data.paymentSettingId,
      paymentStatus: data.paymentStatus,
      orderStatus: data.orderStatus,
    }

    const orderSummaryInfo = {
      totalAmount: data.orderTotalAmount,
      subtotal: data.orderSubtotal,
      discount: data.offer && data.offer.amount ? data.offer.amount : '-',
      discountCode:
        data.offer && data.offer.id && data.offer.coupenCode ? (
          <Link
            className="utils__link--underlined text-lowercase"
            to={`${LINKS.editCoupen}/${data.offer.id}`}
          >
            {data.offer.coupenCode}
          </Link>
        ) : (
          '-'
        ),
    }

    const paymentStatusInfo = {
      paymentType: data.paymentType,
      transactionId: data.transactionId,
      paymentStatus: data.paymentStatus,
    }
    const formInitialValues = pick(data, ['paymentStatus', 'orderStatus', 'paymentSettingId'])

    return (
      <>
        <Helmet title="Order Details" />
        <Modal
          visible={state.isShippingAddrModal}
          title={`Shipping address for Order #${data.orderNo}`}
          destroyOnClose
          onCancel={onCancelShippingModal}
          footer={null}
        >
          <OrderAddressForm
            onSubmit={onSubmitShippingAddr}
            initialValues={state.data.shippingAddress}
            onCancel={onCancelShippingModal}
          />
        </Modal>
        <Modal
          visible={state.isBillingAddrModal}
          title={`Billing address for Order #${data.orderNo}`}
          destroyOnClose
          onCancel={onCancelBillingModal}
          footer={null}
        >
          <OrderAddressForm
            onSubmit={onSubmitBillingAddr}
            initialValues={state.data.billingAddress}
            onCancel={onCancelBillingModal}
          />
        </Modal>
        <Modal visible={state.isPreview} destroyOnClose onCancel={closePreview} footer={null}>
          <div>
            <img src={state.previewUrl} alt="" className="img-fluid w-100" />
          </div>
        </Modal>
        <div className="container-fluid">
          <Helmet title="Order Details" />
          <div className="mb-2 d-flex justify-content-end">
            {!state.isEdit && (
              <>
                <Button className="ml-2" onClick={handleEditToggle}>
                  Edit
                </Button>

                {canCreateShipment && (
                  <Link to={`/shipment/create/${orderId}`}>
                    <Button className="ml-2" type="primary">
                      Create Shipment
                    </Button>
                  </Link>
                )}
                {hasShipments && (
                  <Link to={`/shipment/list/${orderId}`}>
                    <Button className="ml-2" type="primary">
                      View Shipments
                    </Button>
                  </Link>
                )}
              </>
            )}
            {state.isEdit && (
              <Button className="ml-2" type="dashed" onClick={handleEditToggle}>
                Cancel
              </Button>
            )}
            {/* {!state.isEdit && !state.isShipment && (
              <>
                <Button className="ml-2" onClick={handleEditToggle}>
                  Edit
                </Button>

                <Button className="ml-2" type="primary" onClick={handleShipmentToggle}>
                  Create Shipment
                </Button>
              </>
            )}
            {state.isEdit && !state.isShipment && (
              <Button className="ml-2" type="dashed" onClick={handleEditToggle}>
                Cancel
              </Button>
            )}
            {state.isShipment && !state.isEdit && (
              <Button className="ml-2" type="dashed" onClick={handleShipmentToggle}>
                Cancel
              </Button>
            )} */}
          </div>

          <div className="row view-order-cards mb-4">
            <div className="col-lg-4">
              <DescriptionList
                card
                title={`${state.isEdit ? 'Editing ' : ''}Order #${data.id}`}
                data={orderInfoData}
              />
            </div>
            <div className="col-lg-8">
              <div className="card pb-sm-4">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="card-header">
                      <div className="utils__title">
                        <strong>Shipping Address</strong>
                        {state.isEdit && (
                          <span>
                            <Button
                              icon="edit"
                              className="mr-1 ml-2"
                              size="small"
                              onClick={openShippingModal}
                            />
                          </span>
                        )}
                      </div>

                      {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
                    </div>
                    <div className="card-body shipping-address">
                      <div className="col-xl-12">
                        <DescriptionList data={data.shippingAddress} />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="card-header">
                      <div className="utils__title">
                        {/* <Icon className={styles.icon} type="shopping-cart" /> */}
                        <strong>Billing Address</strong>
                        {state.isEdit && (
                          <span>
                            <Button
                              icon="edit"
                              className="mr-1 ml-2"
                              size="small"
                              onClick={openBillingModal}
                            />
                          </span>
                        )}
                      </div>
                      {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
                    </div>
                    <div className="card-body">
                      <div className="col-xl-12">
                        <DescriptionList data={data.billingAddress} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isPresOrder && (
            <div className="row">
              <div className="col">
                <CardWrapper title="Prescriptions">
                  {data.prescriptions && data.prescriptions.length > 0 && (
                    <div className={styles.presList}>
                      {data.prescriptions.map(i => (
                        <div key={i.id} className={styles.presItem}>
                          <div className={styles.overlay}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/${i.prescription.url}`}
                            >
                              <Icon
                                type="eye"
                                // onClick={togglePreview(i.prescription.url)}
                              />
                            </a>
                          </div>
                          {/* {getFileExtension(
                            i.prescription.thumbnail || i.prescription.thumbnail,
                          ) === 'pdf' ? (
                            <object
                              data={`/${i.prescription.url}`}
                              type="application/pdf"
                              className="img-fluid"
                              // width="800"
                              // height="1200"
                              typemustmatch
                            >
                              <p>
                                You don&apos;t have a PDF plugin, but you can
                                <a href={`/${i.prescription.url}`}>download the PDF file.</a>
                              </p>
                            </object>
                          ) : ( */}
                          {getFileExtension(i.prescription.thumbnail || i.prescription.url) ===
                          'pdf' ? (
                            <p className="text-muted text-center">PDF</p>
                          ) : (
                            <img
                              className="img-fluid"
                              src={i.prescription.thumbnail || i.prescription.url}
                              alt=""
                            />
                          )}
                          {/* )} */}
                        </div>
                      ))}
                    </div>
                  )}
                  {data.prescriptions && data.prescriptions.length === 0 && <Empty />}
                </CardWrapper>
              </div>
            </div>
          )}
          <div className="row mb-4">
            <div className="col-lg-12">
              {!state.isEdit && (
                <OrderedProductsList
                  orderId={data.orderNo}
                  orderItems={orderItems}
                  summary={orderSummaryInfo}
                />
              )}
              {state.isEdit && (
                <OrderedItemsTable
                  orderId={data.orderNo}
                  data={orderItems}
                  onEditCell={onEditOrderItem}
                  onAdd={onAddOrderItem}
                  summary={orderSummaryInfo}
                />
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className={classNames('col-md-6', { 'col-md-12': state.isEdit })}>
              {!state.isEdit && (
                <DescriptionList card title="Order Status" data={orderStatusInfo} />
              )}

              {state.isEdit && (
                <OrderStatusForm
                  title="Manage Order Status"
                  initialValues={formInitialValues}
                  onSubmit={handleSubmitOrder}
                />
              )}
            </div>
            {!state.isEdit && (
              <div className="col-md-6">
                <DescriptionList card title="Payment Status" data={paymentStatusInfo} />
              </div>
            )}
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <OrderHistoryTable data={data.orderHistory} />
            </div>
          </div>

          {/* {state.isShipment && (
            <ShipmentFormAdmin orderId={orderId} onSubmit={handleSubmitShipment} />
          )} */}
        </div>
      </>
    )
  }

  if ((!loading && !response) || (!loading && error))
    return (
      <NotFound
        title="Error!"
        subtitle={error ? error.message : 'Something went wrong'}
        resetDefault
        goBackText="Back to orders"
        to={LINKS.ordersList}
      />
    )
  return null
}

export default connect(({ user }) => ({ user }))(ViewOrder)
