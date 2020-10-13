import React from 'react'
import { Helmet } from 'react-helmet'
import { CATALOG_API_URL } from '_constants'
import { Skeleton } from 'antd'
import Query from 'components/Query'
import Form from './Form copy'

const URL = CATALOG_API_URL.saltsynonims

const CountryEditFormIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params

  let form = <Form onSuccess={() => history.go(-1)} />
  if (id) {
    form = (
      <Query url={`${URL}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data) return <Form initialValues={res.data} onSuccess={() => history.go(-1)} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Salt SYNONYMS' : 'Add Salt SYNONYMS'
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
