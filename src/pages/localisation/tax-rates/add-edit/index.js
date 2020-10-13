import React from 'react'
import { Helmet } from 'react-helmet'
import { CATALOG_API_URL, STRINGS } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
import Form from './Form'

const URL = CATALOG_API_URL.taxRate

const TaxRateEditIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params

  const onAddNew = (values) => {
    // const { geozone, ...rest } = values
    // let newObj = { ...rest }
    // if (geozone) {
    //   newObj = { ...newObj, geozone: JSON.stringify(geozone) }
    // }
    
    const url = `${URL}/create`
    editTaxRate(url, values, 'POST')
  }

  const onEdit = (values) => {
    const url = `${URL}/${id}`
    editTaxRate(url, values)
  }

  const editTaxRate = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'json', method)
    if (res?.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
      history.go(-1)
    }
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  let form = <Form onSubmit={onAddNew} />
  if (id) {
    form = (
      <Query url={`${URL}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data) return <Form initialValues={res.data} onSubmit={onEdit} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Tax Rate' : 'Add Tax Rate'
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

export default TaxRateEditIndex
