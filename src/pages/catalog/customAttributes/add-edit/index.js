import React from 'react'
import { Helmet } from 'react-helmet'
import { STRINGS, API_CUSTOM_ATTRIBUTES } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
import Form from './Form'

const CountryEditFormIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params

  const onAddNew = (values) => {
    console.log('check', values)
    if (values['']) {
      delete values['']
    }
    const url = API_CUSTOM_ATTRIBUTES.create
    submitData(url, values, 'POST')
  }

  const onEdit = (values) => {
    const url = `${API_CUSTOM_ATTRIBUTES.edit}/${id}`
    submitData(url, values)
  }

  const submitData = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'formdata', method)
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

  let form = <Form handleSubmit={onAddNew} type="add" />
  if (id) {
    form = (
      <Query url={`${API_CUSTOM_ATTRIBUTES.edit}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data)
            return <Form initialValues={res.data} id={id} type="edit" handleSubmit={onEdit} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Custom Attributes' : 'Add Custom Attributes'
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
