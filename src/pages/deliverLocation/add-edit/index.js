/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'

import { Skeleton } from 'antd'

// import { CATALOG_BANNER_API_URL } from '_constants'

import Form from './Form'

const FormIndex = (props) => {
  const { match } = props
  const { params } = match
  let { id } = params
  console.log('id', id)
  let tit = 'Add Delivery Location'
  let form = <Form />
  if (id === 'add-edit') {
    console.log('id', id)
    id = undefined
    form = ''
    tit = ''
  }
  if (id) {
    form = (
      <Query url={`/api/catalog/v1/availabilitypincode/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res.data) return <Form data={res.data} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Delivery Location' : tit
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

export default withRouter(FormIndex)
