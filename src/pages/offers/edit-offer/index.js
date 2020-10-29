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
// import { resolve } from 'react-resolver'
import axios from 'axios'

import moment from 'moment'
import { API_URL, SUCCESS, EDIT_SUCCESS_MESSAGE, FAILED } from '_constants'
import OfferForm from '../OfferForm'

class OfferAdd extends React.Component {
  state = {
    offerData: '',
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
    productsList: [],
  }

  componentDidMount() {
    this.fetchAll()
  }

  updateFields = (updatedFieldsOffers, offer) => {
    Object.entries(offer).map(([key, value]) => {
      console.log(key, value)

      if (updatedFieldsOffers[key]) {
        if (key === 'startDate' || key === 'endDate') {
          updatedFieldsOffers[key].value = moment(value)
        } else {
          updatedFieldsOffers[key].value = value
        }
      }
      return ''
    })
  }

  fetchAll = () => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const { productsUrl, offersUrl } = API_URL
    const offerUrl = `${offersUrl}/${id}`
    axios
      .all([axios.get(productsUrl), axios.get(offerUrl)])
      .then(
        axios.spread((products, offerResp) => {
          console.log(products, offerResp)
          const offer = offerResp.data.discount
          this.setState(prevState => {
            const updatedFieldsOffers = { ...prevState.fieldsOffers }
            this.updateFields(updatedFieldsOffers, offer)
            return {
              ...prevState,
              productsList: products.data.products,
              fieldsOffers: {
                ...prevState.fieldsOffers,
                updatedFieldsOffers,
              },
              offerData: offer,
            }
          })
        }),
      )
      .catch(error => console.log(error))
  }

  handleResetForm = () => {
    const { offerData: offer } = this.state
    this.setState(prevState => {
      const updatedFieldsOffers = { ...prevState.fieldsOffers }
      this.updateFields(updatedFieldsOffers, offer)
      return {
        ...prevState,
        fieldsOffers: {
          ...prevState.fieldsOffers,
          updatedFieldsOffers,
        },
      }
    })
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
    const { match } = this.props
    const { params } = match
    const { id } = params
    const url = `${API_URL.offersUrl}/${id}`
    const { fieldsOffers } = this.state
    const requestBody = {}
    Object.entries(fieldsOffers).map(([key, value]) => {
      requestBody[key] = value.value
      return ''
    })
    axios.patch(url, requestBody).then(
      response => {
        console.log(response)
        notification.success({
          message: SUCCESS,
          description: EDIT_SUCCESS_MESSAGE,
        })
      },
      error => {
        notification.error({
          message: FAILED,
          description: error.message,
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
      // loading,
    } = this.state

    console.log(productsList)
    return (
      <>
        <Helmet title="Edit Offer" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Edit Offer</strong>
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
              onReset={this.handleResetForm}
            />
          </div>
        </div>
      </>
    )
  }
}

export default OfferAdd
