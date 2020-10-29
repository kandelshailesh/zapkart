/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Table, Button } from 'antd'

import { CATALOG_API_URL, LINKS } from '_constants'
import Query from 'components/Query'
import { Link } from 'react-router-dom'
import PlaceholderImage from 'components/PlaceholderImage'

const UserWishlist = props => {
  const { userId } = props

  // const [{ response, loading: loadingFetch }] = useFetching(
  //   `${CATALOG_API_URL.getUserOrders}/${userId}`,
  //   {},
  // )

  const setRowKey = record => record.id

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (a, b, index) => `#${index + 1}`,
      // sorter: {
      //   multiple: 3,
      // },
      // search: true,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'images',
      key: 'thumbnail',
      render: (a, record) => {
        const img =
          record.images && record.images.length && record.images.length > 0
            ? record.images[0].thumbnail
            : null
        return (
          <span className="thumbnail-area">
            <PlaceholderImage src={img} alt={record.name} />
          </span>
        )
      },
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`${LINKS.editProduct}/${record._id}`} className="utils__link--underlined">
          {text}
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`${LINKS.editProduct}/${record._id}`}>
            <Button
              icon="eye"
              className="mr-1"
              size="small"
              // onClick={() => setRefresh(prev => !prev)}
            />
          </Link>
        </span>
      ),
    },
  ]

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }

  return (
    <div>
      <Query url={`${CATALOG_API_URL.getWishlist}/${userId}`} noLoader>
        {(response, loading) => {
          if (response && response.wishlist)
            return (
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>User Wishlist</strong>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    className="utils__scrollTable"
                    loading={loading}
                    columns={columns}
                    dataSource={response.wishlist.products || []}
                    rowKey={setRowKey}
                  />
                </div>
                {/* )} */}
              </div>
            )
          return null
        }}
      </Query>
    </div>
  )
}

export default UserWishlist
