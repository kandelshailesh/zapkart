import React from 'react'
import { Helmet } from 'react-helmet'
import { CATALOG_API_URL, STRINGS } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
import Form from './Form'

const URL = CATALOG_API_URL.state

const CountryEditFormIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params
  
  const handleSubmit = (values) => {
    const dt = {}
    Object.keys(values).forEach((key) => {
      if (key?.length > 0) {
        if (key === 'country') {
          dt.country = values[`${key}`]
        } else if (key === 'state') {
          dt.state = values[`${key}`]
        } else if (key === 'status') {
          dt.status = values[`${key}`]
        }
      }
    })

    if (id) {
      const url = `${URL}/${id}`
      submitData(url, dt)
    } else {
      const url = `${URL}/create`
      submitData(url, dt, 'POST')
    }
  }

  const submitData = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'json', method)
    if (res?.success) {
      notification.success({
        message: STRINGS.Success,
        description: id ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      history.go(-1)
    }
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  let form = <Form onSubmit={handleSubmit} />
  if (id) {
    form = (
      <Query url={`${URL}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data) return <Form initialValues={res.data} onSubmit={handleSubmit} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit State' : 'Add State'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body min-height-700">{form}</div>
      </div>
    </div>
  )
}

export default CountryEditFormIndex
