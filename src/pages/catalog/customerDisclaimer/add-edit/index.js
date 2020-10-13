import React from 'react'
import { Helmet } from 'react-helmet'
import { STRINGS, CATALOG_API_URL } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
import Form from './Form'

const URL = CATALOG_API_URL.disclaimer

const CountryEditFormIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params

  const onAddNew = (values) => {
    console.log('check', values)
    const url = `${URL}/create`

    submitData(url, values, 'POST')
  }

  const onEdit = (values) => {
    const url = `${URL}/${id}`
    submitData(url, values)
  }

  const submitData = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'json', method)
    if (res?.success) {
      notification.success({
        message: STRINGS.success,
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
  const title = id ? 'Edit Disclaimer' : 'Add Disclaimer'
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
