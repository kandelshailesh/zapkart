import React from 'react'
import { Helmet } from 'react-helmet'
import { addPrecriptionByAdmin } from 'services/orders'
import Form from './Form'

const OrdersList = ({ userId, isModal = false, onModalFormSubmit }) => {
  const handleSubmit = async (values) => {
    const data = {}

    Object.keys(values).forEach((key) => {
      if (key?.length > 0) {
        if (key) {
          data[key] = values[key]
        }
      }
    })
    const res = await addPrecriptionByAdmin(data, userId)
    onModalFormSubmit(res)
  }

  const form = <Form onSubmit={handleSubmit} />
  if (isModal) {
    return <Form onSubmit={handleSubmit} />
  }
  return (
    <div>
      <Helmet title="Upload Precription" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Upload Prescrpion</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default OrdersList
