import React from 'react'
import { Helmet } from 'react-helmet'
import { addAddress } from 'services/address'
import { notification } from 'antd'
import { STRINGS } from '_constants'
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
    const res = await addAddress(data, userId)
    onModalFormSubmit(res)
    if (res?.success) {
      notification.success({
        message: STRINGS.Success,
        description: STRINGS.addSuccess,
      })
    } else
      notification.error({
        message: STRINGS.addError,
        description: res.error,
      })
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  const form = <Form onSubmit={handleSubmit} />
  if (isModal) {
    return <Form onSubmit={handleSubmit} />
  }
  return (
    <div>
      <Helmet title="Add new AddressF" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Add Address</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default OrdersList
