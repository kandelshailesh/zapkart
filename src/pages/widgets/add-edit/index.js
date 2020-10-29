import React from 'react'
import { Helmet } from 'react-helmet'
import { CATALOG_API_URL, STRINGS } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
import MainFormTabs from './FormIndex'

// const URL = CATALOG_API_URL.country

const WidgetEditForm = (props) => {
  const { history, match } = props
  const { params } = match
  const { id } = params
  console.log('sds', props)
  const loader = (
    <div className="card-body">
      <Skeleton active />
    </div>
  )

  const renderForm = () => (
    <Query url={`${CATALOG_API_URL.widget}/query?id=${id}`} loader={loader}>
      {({ data }) => {
        // eslint-disable-next-line no-underscore-dangle
        if (data[0].slug === id || data[0]._id === id) {
          return <MainFormTabs onSubmitHandle={onEdit} widgetID={id} data={data[0]} />
        }
        return null
      }}
    </Query>
  )

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

  const onAddNew = async (values) => {
    console.log('check', values)
    const { widgetCreate } = CATALOG_API_URL
    await submitData(widgetCreate, values, 'POST')
  }

  const onEdit = async (values) => {
    const { widget } = CATALOG_API_URL
    await submitData(`${widget}/${id}`, values)
  }

  const title = id ? 'Edit Widget' : 'Add Widget'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body min-height-700">
          {id ? renderForm() : <MainFormTabs onSubmitHandle={onAddNew} />}
        </div>
      </div>
    </div>
  )
}

export default WidgetEditForm
