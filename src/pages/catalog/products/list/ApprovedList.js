/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Icon, notification, Modal, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import Table from 'components/Table'
// import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { deleteProduct, editStatus } from 'services/products'
import { LINKS } from '_constants'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import { getCategories } from 'services'
// import Upload from 'components/Upload'
// import { excelUploadSchema } from 'utils/Schema'
// import Form from 'components/Form'
import { connect } from 'react-redux'
import { reducer, initialState } from './reducer'
import AddProductPrice from '../add-edit/forms/AddProductPrice'

const scrollStyle = { x: '100%' }

const itemsPerPageOptions = [4, 10, 20, 50, 100]

const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

const Products = (props) => {
  const { user } = props
  const { id: currentUserID, userTypeId } = user

  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);
  const [isModalOpen, setisModalOpen] = useState(false)
  const [productID, setProductID] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const [{ response, loading, error }] = useFetching(
    `/api/catalog/v1/products?isBase=true${
      userTypeId === 3 ? `&merchant=${currentUserID}` : ''
    }&adminapprovestatus=approve&page=${state.current}&limit=${state.pageSize}${
      isEmpty(state.sortQuery) ? '' : `&${state.sortQuery}`
    }${isEmpty(state.searchQuery) ? '' : `&${state.searchQuery}`}${
      isEmpty(state.filterQuery) ? '' : `&${state.filterQuery}`
    }`,
  )
  // const [{ response, loading }] = useFetching(
  //   `/api/catalog/v1/products?page=${state.current}&limit=${state.pageSize}${
  //       state.sorters.sortField && state.sorters.sortOrder
  //         ? `&sortField=${state.sorters.sortField}&sortOrder=${state.sorters.sortOrder}`
  //         : ''
  //     }${
  //       state.searchers? state.searchQuery: ''
  //     }`,
  // )

  const handleMenuClick = async (e) => {
    // refetch
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editStatus(state.statusClickedId, e.key)
    if (isUpdated) {
      dispatch({
        type: 'updateClickedProdStatus',
        payload: e.key,
      })
    }
    dispatch({
      type: 'clearStatusClickedId',
    })
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      dispatch({
        type: 'setProducts',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
    console.log(error, response)
    if (error) {
      dispatch({
        type: 'clearProducts',
      })
      dispatch({
        type: 'clearPagination',
      })
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = async (id) => {
    // use refetch in usefetching
    const isDeleted = await deleteProduct(id)
    if (isDeleted) {
      dispatch({
        type: 'deleteProduct',
        payload: id,
      })
    }
  }

  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

  const handleTableChange = ({ pagination: params, sorters: sortParams, filters }) => {
    console.log('list handleTableChange params', params, sortParams, filters)
    dispatch({
      type: 'setCurrentPage',
      payload: params.current,
    })
    dispatch({
      type: 'setPageSize',
      payload: params.pageSize,
    })

    if (!isEmpty(sortParams)) {
      console.log('sortParams.field', sortParams.field)
      console.log('sortParams.order', sortParams.order)
      dispatch({
        type: 'setSorters',
        payload: {
          sortField: sortParams.field,
          sortOrder: sortParams.order,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    } else {
      dispatch({
        type: 'clearSorters',
      })
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })
    dispatch({
      type: 'setFilters',
      payload: filters.filters,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  const handleCategorySearch = async (value) => {
    const query = { search: { name: value }, fields: ['name', '_id'] }
    console.log(qs.stringify(query))
    console.log('query string', query)
    const data = await getCategories({ search: { name: value }, field: ['name', '_id'] })
    if (data)
      dispatch({
        type: 'setCategories',
        payload: data,
      })
    // setFetchingProds(true)
    // const data = await getProducts({ search: { name: value }, fields: ['name', '_id'] })
    // setFetchingProds(false)
    // if (data) setProducts(data)
  }

  // const handleItemsChange = a => {
  //   dispatch({
  //     type: 'setPageSize',
  //     payload: Number(a),
  //   })
  // }

  const deleteRecords = (rowKeys) => {
    console.log('will delete ok', rowKeys)
  }

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => `#${index + 1}`,
      // search: true,
      // filterLabel: 'ID',
      // search: true,
      // sorter: (a, b) => a._id - b._id,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <div className="thumbnail-area">
          <img src={record.images.length > 0 ? record.images[0].thumbnail : ''} alt="" />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.localeCompare(b.name),
      sorter: true,
      multiple: 1,
      render: (text, record) => (
        <Link className="utils__link--underlined" to={`${LINKS.editProduct}/${record._id}`}>
          {text}
        </Link>
      ),
      search: true,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      multiple: 2,
      // sorter: (a, b) => a.featured - b.featured,
      sorter: true,
      render: (text) => (text ? 'Yes' : 'No'),
      filters: [
        {
          label: 'Yes',
          value: 'true',
        },
        {
          label: 'No',
          value: 'false',
        },
      ],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => {
        let str = ''
        if (record.category && record.category.length > 0) {
          record.category.forEach((i, index) => {
            if (i.name) {
              str += i.name
              if (index < record.category.length - 1) str += ','
            }
          })
        }
        return str
      },
      onSelectSearch: handleCategorySearch,
      filterMultiple: true,
      filters: state.categories.map((i) => ({
        label: i.name,
        value: i._id,
      })),
    },
    {
      title: 'Is Variant',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text, record) => {
        let badge = 'badge-light'
        if (record.parentId === null) badge = 'badge-secondary'
        return (
          <span className={`font-size-12 badge ${badge}`}>{record.parentId ? 'Yes' : 'No'}</span>
        )
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (_, record) => (record.brand && record.brand.name ? record.brand.name : ''),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Price',
      dataIndex: 'pricing',
      key: 'price',
      render: (_, record) => {
        if (user.userTypeId === 1) {
          return (
            <Link to={`/catalog/products/${record._id}/pricingTable`}>
              <Button size="small" type="primary">
                Price List
              </Button>
            </Link>
          )
        }
        return (
          <div className="list-sale-price">
            <span>Rs {record.pricing ? record?.productPricing?.salePrice : ''}</span>
            <span>Rs {record.pricing ? record?.productPricing?.listPrice : ''}</span>
          </div>
        )
      },
    },
    {
      title: 'Approve status',
      dataIndex: 'adminapprovestatus',
      key: 'adminapprovestatus',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.adminapprovestatus === 'reject') badge = 'badge-danger'
        if (record.adminapprovestatus === 'pending') badge = 'badge-warning'
        return (
          // <Dropdown
          //   // eslint-disable-next-line react/destructuring-assignment
          //   // visible={this.state.clickedId === record._id}
          //   overlay={menu}
          //   // ref={this.clickId}
          //   id={record._id}
          //   onClick={() => handleStatusClick(record._id)}
          //   trigger={['click']}
          // >
          <span className={`font-size-12 badge ${badge} 'badgeText'`}>
            {text.toUpperCase()}
            {/* <Icon type="down" /> */}
          </span>
          // </Dropdown>
        )
      },
      filters: [
        {
          label: 'pending',
          value: 'Pending',
        },
        {
          label: 'Approve',
          value: 'approve',
        },
        {
          label: 'reject',
          value: 'Reject',
        },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'
        return (
          <Dropdown
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            // ref={this.clickId}
            id={record._id}
            onClick={() => handleStatusClick(record._id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
      filters: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Hold',
          value: 'hold',
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line no-unused-vars
      render: (record) => (
        <span>
          <Link to={`${LINKS.editProduct}/${record._id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          {state.products.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  // const handleExcelSubmit = async ({ file }) => {
  //   console.log('consoele', file)
  //   const success = await uploadPrintList(file)
  //   console.log('aaaa', success)
  //   if (success)
  //     notification.success({
  //       message: 'Uploaded successfully',
  //     })
  // }

  // const excelFI = [
  //   {
  //     label: 'File',
  //     name: 'file',
  //     key: 'file',
  //     type: (
  //       <Upload name="file" multiple listType="text" accept=".pdf,application/pdf,image/*">
  //         <Button>
  //           <Icon type="upload" /> Select File
  //         </Button>
  //       </Upload>
  //     ),
  //   },
  // ]
  return (
    <div>
      <Modal
        visible={isModalOpen}
        closable
        onCancel={() => {
          setisModalOpen(false)
        }}
        destroyOnClose
        footer={false}
      >
        <AddProductPrice
          onSuccess={() => {
            setisModalOpen(false)
          }}
          productID={productID}
        />
      </Modal>

      <Helmet title="Products List" />
      <Table
        loading={loading}
        scroll={scrollStyle}
        pagination={pagination}
        currentPage={pagination.current}
        limit={pagination.pageSize}
        total={pagination.total}
        limits={itemsPerPageOptions}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={state.products}
        rowKey={setRowKey}
        onChange={handleTableChange}
        onDelete={deleteRecords}
      />
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Products)
