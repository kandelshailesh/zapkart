import React from 'react'
import {
  // message,
  // Form,
  // Radio,
  // Skeleton,
  notification,
  // Skeleton,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
// import { resolve } from 'react-resolver'
import axios from 'axios'

import { API_URL, LINKS, SUCCESS, ADD_SUCCESS_MESSAGE, FAILED } from '_constants'
// import moment from 'moment'
import OfferForm from '../OfferForm'

class OfferAdd extends React.Component {
  state = {
    fieldsOffers: {
      couponName: {
        value: '',
      },
      code: {
        value: '',
      },
      type: { value: '' },
      discount: { value: '' },
      totalAmount: { value: '' },
      customerLogin: { value: false },
      freeShipping: { value: false },
      products: { value: [] },
      categories: { value: [] },
      startDate: { value: null },
      endDate: { value: null },
      usesPerCoupon: { value: '' },
      usesPerCustomer: { value: '' },
      status: { value: '' },
    },
    productsList: '',
    addSuccess: false,
    id: '',
  }

  componentDidMount() {
    this.fetchProducts()
  }

  handleDataFormChange = changedFields => {
    this.setState(({ fieldsOffers }) => ({
      fieldsOffers: { ...fieldsOffers, ...changedFields },
    }))
  }

  fetchProducts = () => {
    const url = API_URL.productsUrl
    axios.get(url).then(
      response => {
        console.log(response.data.products)
        this.setState({
          productsList: response.data.products,
        })
      },
      error => {
        console.log(error)
      },
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const url = API_URL.offersUrl
    const { fieldsOffers } = this.state
    const requestBody = {}
    Object.entries(fieldsOffers).map(([key, value]) => {
      requestBody[key] = value.value
      return ''
    })
    axios.post(url, requestBody).then(
      response => {
        console.log(response)
        const { data } = response
        const { discount } = data
        const { _id } = discount
        notification.success({
          message: SUCCESS,
          description: ADD_SUCCESS_MESSAGE,
        })
        this.setState({
          addSuccess: true,
          id: _id,
        })
      },
      error => {
        notification.error({
          message: FAILED,
          description: error.message,
        })
        this.setState({
          addSuccess: false,
        })
      },
    )
    console.log('handle submit')
  }

  render() {
    const {
      // fields,
      fieldsOffers,
      productsList,
      addSuccess,
      id,
      // loading,
    } = this.state

    console.log(productsList)
    if (addSuccess && id) {
      return <Redirect to={`${LINKS.offersList}/${id}`} />
    }
    return (
      <>
        <Helmet title="Add Offer" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong draggable onDragEnd={e => console.log(e)}>
                Add Offer
              </strong>
            </div>
          </div>
          <div className="card-body">
            {/* <h4 className='text-black mb-3'>
              <strong>Main Parameters</strong>
            </h4> */}

            <OfferForm
              {...fieldsOffers}
              productsList={productsList}
              onChange={this.handleDataFormChange}
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </>
    )
  }
}

export default OfferAdd
