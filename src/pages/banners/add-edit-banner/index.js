/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'

import { Skeleton } from 'antd'

import { BANNER_API_URL } from '_constants'

import Form from './Form'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params

  let form = <Form />
  if (id) {
    form = (
      <Query url={`${BANNER_API_URL.getBanners}/${id}`} loader={<Skeleton active />}>
        {res => {
          if (res.data) return <Form data={res.data} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit banner' : 'Add banner'
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
