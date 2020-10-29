import React from 'react'
import {
  Form,
  // Card,
  Avatar,
  // Menu,
  // Dropdown,
  Icon,
  Input,
  Button,
  Popconfirm,
  Radio,
  Modal,
  // Tooltip,
  Rate,
  Table,
} from 'antd'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import styles from './style.module.scss'
import table from './data.json'
import { getFormattedDate, getFormattedTime } from '../../../utils'

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
      console.log(reviewId)
      console.log(selectedReview)
      const { getFieldDecorator } = form
      return (
        <Modal
          style={{ top: 20 }}
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
                <Avatar size="50" src={selectedReview.user.profile_img} border="false" />
              </div>
              <div className={styles.commentContent}>
                <div className="clearfix">
                  <div className="pull-left">
                    <strong>{selectedReview.user.name}</strong> posted:
                    <br />
                    <small className="text-muted">
                      {getFormattedDate(selectedReview.createdAt)}
                    </small>
                  </div>
                  <div className="pull-right">
                    <Rate disabled allowHalf defaultValue={selectedReview.review.rating} />
                  </div>
                </div>
                <div>{selectedReview.review.text}</div>
                <br />
              </div>
            </div>
            <Form.Item label="Status" className={`${styles.collectionCreateFormLastFormItem}`}>
              {getFieldDecorator('modifier', {
                initialValue: selectedReview.status,
              })(
                <Radio.Group>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="approved">Approved</Radio.Button>
                  <Radio.Button value="disabled">Disabled</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  },
)

@Form.create()
class Reviews extends React.Component {
  state = {
    tableData: table.data,
    // data: table.data,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    showReviewModal: false,
    selectedId: '',
    selectedReview: '',
    selectedRowKeys: [],
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      tableData: tableData
        .map(record => {
          const match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map((text, i) =>
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }

  linkSearchInput = node => {
    this.searchInput = node
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  handleModalClick = record => {
    console.log(typeof record)
    console.log('clicked to show modal')
    this.setState(
      {
        selectedId: record.id,
        selectedReview: record,
        showReviewModal: true,
      },
      () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        // window.dispatchEvent(new Event('resize'))
      },
    )
  }

  handleCancelModal = () => {
    console.log('clicked to cancel modal')
    this.setState({ selectedId: '', showReviewModal: false })
  }

  handleCreateModal = () => {}

  render() {
    // const { form } = this.props
    const {
      tableData,
      searchText,
      filtered,
      filterDropdownVisible,
      selectedRowKeys,
      showReviewModal,
      selectedId,
      selectedReview,
    } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const columns = [
      // product_id
      // name product
      // reviewer
      // review
      // rating
      // date time
      // action
      {
        title: 'Product',
        dataIndex: 'product.name',
        key: 'product_name',
        render: text => (
          //   <Link
          //     className='utils__link--underlined'
          //     to={`/catalog/reviews/review/${record.id}`}
          //   >
          <span>{text}</span>
          //   </Link>
        ),
        sorter: (a, b) => a.product.name - b.product.name,
      },
      {
        title: 'Reviewer',
        dataIndex: 'user.name',
        key: 'user_name',
        render: text => (
          //   <Link
          //     className='utils__link--underlined'
          //     to={`/catalog/reviews/review/${record.id}`}
          //   >
          <span>{text}</span>
          //   </Link>
        ),
        sorter: (a, b) => a.user.name - b.user.name,
      },
      {
        title: 'Review',
        dataIndex: 'review.text',
        key: 'review',
        render: (text, record) => (
          <div role="article">
            <div
              role="presentation"
              className="utils__link--underlined"
              onClick={() => this.handleModalClick(record)}
            >
              {text.length > 50 ? `${text.substr(0, 50)}...` : text}
            </div>
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
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={this.linkSearchInput}
              placeholder="Search name"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          )
        },
      },
      {
        title: 'Rating',
        dataIndex: 'review.rating',
        key: 'rating',
        sorter: (a, b) => a - b,
        render: text => <Rate disabled allowHalf defaultValue={text} />,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.length - b.status.length,
        render: text => {
          let badge = 'badge-warning'
          if (text === 'approved') badge = 'badge-success'
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
              onClick={() => this.handleModalClick(record)}
            />
            {tableData.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
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
                handleDelete={this.handleDelete}
                attribute="review"
              />
            </div>
          </div>
          <div className="card-body">
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
            />
            {selectedReview !== 'undefined' && selectedReview !== '' && (
              <CollectionCreateForm
                visible={showReviewModal}
                onCancel={this.handleCancelModal}
                onCreate={this.handleCreateModal}
                reviewId={selectedId}
                selectedReview={selectedReview}
              />
            )}
          </div>
        </div>
        {/* <div className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Latest Reviews</strong>
            </div>
          </div>
          <div className='card-body'>
            <h4 className='text-black mb-3'>
              <strong>Main Parameters</strong>
            </h4>
            <div className='col-lg-8'>
              <Card
                size='small'
                title='Small size card'
                extra={<a href='#'>More</a>}
                style={{ width: 300 }}
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              <Card
                size='small'
                title='Small size card'
                extra={<a href='#'>More</a>}
                style={{ width: 300 }}
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              <div className={styles.commentItem}>hello</div>
              <div className={styles.commentItem}>hello</div>
              <div
                className={`clearfix ${styles.commentItem} pb-0
                }`}
              >
                <div className={styles.commentAvatar}>
                  <Avatar size='50' src='' border='false' />
                </div>
                <div className={styles.commentContent}>
                  <div className='clearfix'>
                    <div className='pull-left'>
                      <strong>Sumi</strong> posted:
                      <br />
                      <small className='text-muted'>20-09-2019</small>
                    </div>
                    <div className='pull-right'>
                      <Dropdown overlay={actions}>
                        <a
                          className='ant-dropdown-link'
                          href='#'
                        >
                          Actions <Icon type='down' />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                  <div>hello</div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default Reviews
