import React from 'react'
// import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { Skeleton } from 'antd'
import { CATALOG_API_URL } from '_constants'
import MainFormTabs from './tabs'
import '../style.scss'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params

  let form = <MainFormTabs />
  const loader = (
    <div className="card-body">
      <Skeleton active />
    </div>
  )
  if (id) {
    form = (
      <Query url={`${CATALOG_API_URL.getProducts}/${id}`} loader={loader}>
        {({ data }) => {
          console.log(data.parentId, typeof data.parentId)
          return <MainFormTabs data={data} />
        }}
      </Query>
    )
  }
  const title = id ? 'Edit product' : 'Add product'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Product</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default FormIndex
