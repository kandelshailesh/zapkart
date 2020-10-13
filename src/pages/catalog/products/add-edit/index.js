/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
// import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Query from 'components/Query'
import { Skeleton } from 'antd'
import { CATALOG_API_URL, LINKS } from '_constants'
import usePrevious from 'hooks/usePrevious'
import MainFormTabs from './tabs'
import '../style.scss'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params

  const [productName, setProductName] = useState(null)

  const prevId = usePrevious(id)

  const addForm = <MainFormTabs />

  const loader = (
    <div className="card-body">
      <Skeleton active />
    </div>
  )

  useEffect(() => {
    if (id !== prevId) renderForm()
  }, [id])

  const renderForm = () => (
    <Query url={`${CATALOG_API_URL.getProducts}/${id}`} loader={loader}>
      {({ data }) => {
        if (data._id === id) {
          setProductName(data.name)
          console.log('returning correct data')
          return <MainFormTabs data={data} />
        }
        return null
      }}
    </Query>
  )

  const title = id ? 'Edit product' : 'Add product'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div className="utils__title">
            {!id && <strong>Add Product</strong>}
            {id && (
              <>
                <strong>Product - </strong>
                {productName}
              </>
            )}
          </div>
          <Link className="utils__link--underlined" to={LINKS.productList}>
            <span className="mr-2">
              <i className="fa fa-arrow-left" />
            </span>
            Back to Products list
          </Link>
        </div>
        <div className="card-body">{!id ? addForm : renderForm()}</div>
      </div>
    </div>
  )
}

export default FormIndex
