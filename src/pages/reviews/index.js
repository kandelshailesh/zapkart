/* eslint-disable no-underscore-dangle */
import React, { useReducer, useRef } from 'react'
import {
  Form,
  // Card,
  Button,
  Popconfirm,
  Modal,
  // Icon,
  // Tooltip,
  Rate,
  notification,
  Dropdown,
  Icon,
} from 'antd'

// import { Link } from 'react-router-dom'
import Table from 'components/Table'
import Menu from 'components/Menu'
import { getFormattedDate, getFormattedTime } from 'utils'
import useFetching from 'hooks/useFetching'
import { editReview, deleteReview } from 'services/reviews'
import { LINKS, CATALOG_API_URL, STRINGS } from '_constants'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import Link from 'react-router-dom/Link'
import table from './data.json'
import ReviewViewEdit from './edit-review'

const topMargin = { top: 20 }
const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'pending',
    title: 'Pending',
  },
  {
    key: 'disabled',
    title: 'Disabled',
  },
]
// const actions = (
//   <Menu>
//     <Menu.Item>
//       <Icon type='edit' /> Edit Comment
//     </Menu.Item>
//     <Menu.Item>
//       <Icon type='delete' /> Delete Comment
//     </Menu.Item>
//     <Menu.Item>
//       <Icon type='frown-o' /> Mark as a Spam
//     </Menu.Item>
//   </Menu>
// )

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, reviewId, selectedReview } = this.props

      console.log(reviewId)
      console.log(selectedReview)
      // const { getFieldDecorator } = form
      return (
        <Modal
          style={topMargin}
          visible={visible}
          title={`Review for ${selectedReview.product.name}`}
          destroyOnClose
          // okText="Save"
          onCancel={onCancel}
          // onOk={onCreate}
          footer={null}
        >
          <ReviewViewEdit onSubmit={onSave} onCancel={onCancel} selectedReview={selectedReview} />
        </Modal>
      )
    }
  },
)

// @Form.create()
const Reviews = props => {
  /* STATE INIT */
  const initialState = {
    tableData: table.data,
    showReviewModal: false,
    selectedId: '',
    selectedReview: '',
    selectedRowKeys: [],
    forceFetch: false,
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'cancelModal':
        return { ...state, selectedId: '', showReviewModal: false }
      case 'clickModal':
        return {
          ...state,
          selectedId: action.payload.id,
          selectedReview: action.payload,
          showReviewModal: true,
        }
      case 'refetchList':
        console.log('dispatched refetchList current', state.forceFetch, 'new', !state.forceFetch)
        return {
          ...state,
          forceFetch: !state.forceFetch,
        }
      default:
        throw new Error()
    }
  }

  /* STATE INITI */
  const [state, dispatch] = useReducer(reducer, initialState)
  const { showReviewModal, selectedId, selectedReview, forceFetch } = state

  /* REVIEW FETCH */
  const { productId: productIdProp, userId: userIdProp } = props

  let fetchUrl = `${CATALOG_API_URL.getAllReviews}`
  if (productIdProp) fetchUrl = `${CATALOG_API_URL.getProductReviews}/${productIdProp}`
  if (userIdProp) fetchUrl = `${CATALOG_API_URL.getUserReviews}/${userIdProp}`

  console.log('FETCH URL', fetchUrl, 'userIdProp', userIdProp, 'productIdProp', productIdProp)

  const [{ response, loading }] = useFetching(fetchUrl, {}, forceFetch)

  console.log(response, loading)

  let pagination = {}
  if (response && response.data && response.data.reviews) {
    pagination = {
      current: response.data.page,
      pageSize: response.data.reviews.length,
      total: response.data.count,
    }
  }

  /* HANDLING VARIOUS PARAMETER CHANGES */

  const handleStatusChange = async e => {
    console.log('status change', e.key)
    if (response && response.data && response.data.reviews) {
      const { reviews } = response.data
      const review = find(reviews, i => i.id === clickId.current)
      if (!isEmpty(review)) {
        console.log('reviewAA', review)
        let userId = null
        if (productIdProp) userId = review.user.id
        if (review.user && review.user.id) userId = review.user.id
        if (userIdProp) userId = userIdProp
        handleEdit({ status: e.key }, review.id, userId)
      }
    }
  }

  const handleTableChange = (a, b, c) => {
    console.log('table change', a, b, c)
  }

  const handleCancelModal = () => {
    console.log('clicked to cancel modal')
    dispatch({
      type: 'cancelModal',
    })
  }

  const handleDelete = async (reviewId, userId) => {
    const res = await deleteReview(reviewId, userId)
    if (res && res.success) {
      notification.success({
        message: STRINGS.deleteSuccess,
      })
      dispatch({
        type: 'refetchList',
      })
    }
    if (res && res.error) {
      notification.error({
        message: res.error,
      })
    }
  }

  const handleEdit = async (
    values,
    reviewId = selectedReview.id,
    userId = selectedReview.user.id,
  ) => {
    console.log('will submit', values)
    const res = await editReview(values, reviewId, userId)
    if (res && res.data) {
      notification.success({
        message: STRINGS.editSuccess,
      })
      dispatch({
        type: 'cancelModal',
      })
      dispatch({
        type: 'refetchList',
      })
    }
    if (res && res.error)
      notification.error({
        message: STRINGS.error + res.error,
      })
  }

  const menu = <Menu items={menuItems} onClick={handleStatusChange} />
  const clickId = useRef(null)
  console.log(`clickId.current`, clickId.current)

  let firstColumns = []
  if (productIdProp) {
    // each user is different in product reviews
    firstColumns = [
      {
        title: 'User',
        dataIndex: 'user.firstName',
        key: 'firstName',
        render: (_, record) => (
          //   <Link
          //     className='utils__link--underlined'
          //     to={`/catalog/reviews/review/${record.id}`}
          //   >
          <span>{`${record.user.firstName} ${record.user.lastName}`}</span>
          //   </Link>
        ),
        // sorter: (a, b) => a.user.name - b.user.name,
      },
    ]
  }
  // if (userIdProp) {
  // for each product in user reviews
  else
    firstColumns = [
      {
        title: 'Product',
        dataIndex: 'product.name',
        key: 'productName',
        render: (_, record) => (
          <Link
            to={`${LINKS.editProduct}/${record.product._id}`}
            className="utils__link--underlined"
          >
            {`${record.product.name}`}
          </Link>
        ),
      },
      {
        title: 'Thumbnail',
        dataIndex: 'product.images',
        key: 'productImage',
        render: (_, record) => (
          <div className="thumbnail-area">
            <img
              className="image-view"
              src={
                record.product.images && record.product.images.length > 0
                  ? record.product.images[0].thumbnail
                  : ''
              }
              alt={record.title}
            />
          </div>
        ),
      },
    ]

  /* TABLE COLUMNS */
  const columns = [
    ...firstColumns,
    {
      title: 'Review',
      dataIndex: 'text',
      key: 'text',
      render: text => (
        <div role="article">
          <div>{text.length > 50 ? `${text.substr(0, 50)}...` : text}</div>
        </div>
        // text.length > 50 ? `${text.substr(0, 50)}...` : text
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: text => {
        //   <Link
        //     className='utils__link--underlined'
        //     to={`/catalog/products/${record.product_id}`}
        //   >

        return <span>{`${getFormattedDate(text)} ${getFormattedTime(text)}`}</span>
        //   </Link>
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      // sorter: (a, b) => a - b,
      render: text => (
        <Rate
          disabled
          // allowHalf
          value={text ? parseInt(text, 10) : 0}
          className="white-space-no-wrap"
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (text, record) => {
        let badge = 'badge-warning'
        if (text === 'active') badge = 'badge-success'
        else if (text === 'disabled') badge = 'badge-danger'
        return (
          <Dropdown
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            ref={clickId}
            id={record.id}
            onClick={() => {
              clickId.current = record.id
            }}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <Button
            icon="edit"
            className="mr-1"
            size="small"
            // onClick={() => this.handleModalClick(record)}
            onClick={() => {
              let rest = {}
              if (userIdProp)
                rest = { user: response.data && response.data.user ? response.data.user : {} }
              if (productIdProp)
                rest = {
                  product: response.data && response.data.product ? response.data.product : {},
                }
              dispatch({
                type: 'clickModal',
                payload: {
                  ...record,
                  ...rest,
                },
              })
            }}
          />
          {response &&
          response.data &&
          response.data.reviews &&
          response.data.reviews.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() =>
                handleDelete(record.id, productIdProp && record.user ? record.user.id : userIdProp)
              }
            >
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  return (
    <div>
      {/* <Helmet title="Reviews" /> */}
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Reviews List</strong>
          </div>
        </div>
        <div className="card-body">
          {
            <Table
              // className="utils__scrollTable"
              // scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
              pagination={pagination}
              rowKey={record => record.id}
              loading={loading}
              columns={columns}
              dataSource={
                response && response.data && response.data.reviews ? response.data.reviews : []
              }
              onChange={handleTableChange}
            />
          }
          {selectedReview !== 'undefined' && selectedReview !== '' && (
            <CollectionCreateForm
              visible={showReviewModal}
              onCancel={handleCancelModal}
              onSave={handleEdit}
              reviewId={selectedId}
              selectedReview={selectedReview}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Reviews
