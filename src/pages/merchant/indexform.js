import React from 'react'
// import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { Skeleton } from 'antd'
import Form from './Form/index'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params

  let form = <Form />
  const loader = (
    <div className="card-body">
      <Skeleton active />
    </div>
  )
  if (id) {
    form = (
      <Query url={`/api/backend/v1/merchant/${id}`} loader={loader}>
        {({ data }) => <Form data={data || {}} />}
      </Query>
    )
  }
  const title = id ? 'Edit merchant' : 'Add merchant'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default FormIndex
