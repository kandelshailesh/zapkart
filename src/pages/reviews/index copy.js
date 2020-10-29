import React, { useReducer } from 'react'
import {
  Form,
  // Card,
  Avatar,
  Button,
  Popconfirm,
  Radio,
  Modal,
  // Icon,
  // Tooltip,
  Rate,
  InputNumber,
} from 'antd'

import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import Table from 'components/Table'
import AddNew from 'components/CustomComponents/AddNew'
import { getFormattedDate, getFormattedTime } from 'utils'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL } from '_constants'
import styles from './style.module.scss'
import table from './data.json'

const topMargin = { top: 20 }
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
      const { visible, onCancel, onCreate, form, reviewId, selectedReview } = this.props
      const avatarProps = {
        icon: !selectedReview.user.avatarlocation ? 'user' : null,
        src: selectedReview.user.avatarlocation || null,
      }
      console.log(reviewId)
      console.log(selectedReview)
      const { getFieldDecorator } = form
      return (
        <Modal
          style={topMargin}
          visible={visible}
          title={`Review for ${selectedReview.product.name}`}
          okText="Save"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <div
              className={`clearfix ${styles.commentItem} pb-0
                }`}
            >
              <div className={styles.commentAvatar}>
                <Avatar size="50" {...avatarProps} border="false" />
              </div>

              <div className={styles.commentContent}>
                <div className="clearfix">
                  <div className="pull-left">
                    <strong>
                      {selectedReview.user.firstName}&nbsp;{selectedReview.user.lastName}
                    </strong>{' '}
                    posted:
                    <br />
                    <small className="text-muted">
                      {getFormattedDate(selectedReview.createdAt)}
                    </small>
                  </div>
                  <div className="pull-right">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={selectedReview.rating}
                      className="white-space-no-wrap"
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.commentsTitle}>{selectedReview.title}</div>
                  {selectedReview.text}
                </div>
                <br />
              </div>
            </div>
            <Form.Item label="Status">
              {getFieldDecorator('modifier', {
                initialValue: selectedReview.status,
              })(
                <Radio.Group>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="active">Approved</Radio.Button>
                  <Radio.Button value="disabled">Disabled</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item
              label="Priority Order"
              className={`${styles.collectionCreateFormLastFormItem}`}
            >
              {getFieldDecorator('modifier', {
                initialValue: selectedReview.priorityOrder,
              })(<InputNumber />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  },
)

// @Form.create()
const Reviews = props => {
  const initialState = {
    tableData: table.data,
    showReviewModal: false,
    selectedId: '',
    selectedReview: '',
    selectedRowKeys: [],
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
      default:
        throw new Error()
    }
  }

  const { productId } = props

  const [{ response, loading }] = useFetching(`${CATALOG_API_URL.getProductReviews}/${productId}`)
  console.log(response, loading)

  const handleTableChange = (a, b, c) => {
    console.log('table change', a, b, c)
  }

  const handleCancelModal = () => {
    console.log('clicked to cancel modal')
    dispatch({
      type: 'cancelModal',
    })
  }

  const handleDelete = key => {
    console.log('will delete', key)
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { selectedRowKeys, showReviewModal, selectedId, selectedReview } = state

  const columns = [
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
          allowHalf
          defaultValue={text ? parseInt(text, 10) : 0}
          className="white-space-no-wrap"
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // sorter: (a, b) => a.status.length - b.status.length,
      render: text => {
        let badge = 'badge-warning'
        if (text === 'active') badge = 'badge-success'
        else if (text === 'disabled') badge = 'badge-danger'
        return <span className={`badge ${badge}`}>{text}</span>
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
            onClick={() => dispatch({ type: 'clickModal', payload: record })}
          />
          {response &&
          response.data &&
          response.data.reviews &&
          response.data.reviews.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]
  return (
    <div>
      <Helmet title="Reviews" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Reviews List</strong>
            <AddNew
              selectedRowKeys={selectedRowKeys}
              handleDelete={handleDelete}
              attribute="review"
            />
          </div>
        </div>
        <div className="card-body">
          {
            <Table
              // className="utils__scrollTable"
              // scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
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
              // onCreate={this.handleCreateModal}
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
