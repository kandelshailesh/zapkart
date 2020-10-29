import React from 'react'
import { Steps } from 'antd'
import PropTypes from 'prop-types'
import DescriptionList from 'components/DescriptionList'
import styles from './styles.module.scss'

const { Step } = Steps

// const styles = {
//   icon: {
//     margin: '0.5rem',
//   },
// }

const OrderedProductsList = ({ orderItems, orderId, summary }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="utils__title">
          {/* <Icon className={styles.icon} type="shopping-cart" /> */}
          <strong>Products ordered</strong>
        </div>
      </div>
      <div className="card-body">
        <div className={`${styles.infoSubtitle} text-muted`}>
          <i className="ribbon-alone ribbon-hor" />
          <spam>-&nbsp;Requires Prescription</spam>
        </div>
        <div className="order-single-table">
          <div className="order-single-table-header">
            <div className="row">
              <div className="col-lg-6">
                <div className="order-id-wrapper">
                  <span className="order-id">{orderId}</span>
                </div>
              </div>
            </div>
          </div>
          {/* "pending", "shipped", "pickup", "delivered", "cancelled", "dispatched", */}
          {orderItems.map(i => {
            let currentStep = 0
            switch (i.shipmentStatus) {
              case null:
              case undefined:
                currentStep = 0
                break
              case 'pending':
                currentStep = 1
                break
              case 'dispatched':
                currentStep = 2
                break
              case 'shipped':
                currentStep = 3
                break
              case 'pickup':
                currentStep = 4
                break
              case 'delivered':
                currentStep = 5
                break
              // case 'cancelled':
              //   currentStep = 6
              //   break
              default:
                break
            }

            return (
              <div className="order-single-table-content" key={i.id}>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6">
                    <div className="ordered-product-img">
                      <img className="img-fluid" src={i.image || ''} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-7 col-md-7 col-sm-7 ordered-product-details-wrapper">
                    <div className="ordered-product-details">
                      <h5 className="ordered-product-head">
                        {i.title}
                        {i.prescriptionRequired && <span className="ribbon-alone ribbon-hor" />}
                      </h5>
                      <h6 className="ordered-product-id">
                        <strong>SKU: </strong>
                        {i.sku}
                      </h6>
                      {i.assignedMerchant && (
                        <h6 className="ordered-product-assigned">
                          <strong className="text-uppercase text-info">Assigned to - </strong>
                          <strong>Merchant: </strong>
                          {i.assignedMerchant}&nbsp;<strong>Status: </strong>
                          {i.assignedMerchantStatus}
                        </h6>
                      )}
                      {!i.assignedMerchant && (
                        <h6 className="ordered-product-unassigned text-muted">
                          Order not assigned to merchant
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 steps-ordered-wrapper">
                    <div className="steps-ordered-product">
                      <Steps size="small" current={currentStep}>
                        {/* <Step title="Processing" description="" />
                        <Step title="Dispatched" description="Item dispatched to shipment hub" />
                        <Step title="Shipped" description="Item shipped" />
                        <Step title="Delivered" description="Item delivered" /> */}
                        <Step title="Processing" description="Order is being processed" />
                        <Step title="Shipment Pending" description="Shipment has been created" />
                        <Step title="Dispatched" description="Item has been dispatched" />
                        <Step title="Shipped" description="Item shipped" />
                        <Step title="Pickup" description="Item has been picked up" />
                        <Step title="Delivered" description="Item delivered" />
                        {/* <Step title="Delivered" description="Item delivered" /> */}
                      </Steps>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-6 ordered-product-price-wrapper">
                    <h3 className="ordered-product-price">₹{i.subtotal}/-</h3>
                  </div>
                </div>
              </div>
            )
          })}
          {summary && <DescriptionList className="border-top column pt-2" data={summary} />}
        </div>
      </div>
    </div>
  )
}

OrderedProductsList.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // shipmentStatus: PropTypes.oneOf(['Pending', 'Shipment', 'Pickup', 'Delivered']),
      shipmentStatus: PropTypes.string,
    }),
  ).isRequired,
}

export default OrderedProductsList
