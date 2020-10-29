/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Table, Select } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import SearchProvider from 'components/RenderProps/SearchProvider'
import useFetching from 'hooks/useFetching'
import useDidMountEffect from 'hooks/useDidMountEffect'
import {
  getProducts,
  // deleteProduct,
  // editStatus
} from 'services/products'
import { LINKS } from '_constants'

const scrollStyle = { x: '100%' }

const itemsPerPageOptions = [4, 10, 20, 50, 100]

const VariantList = props => {
  console.log(props)
  const { baseProduct, refetch } = props
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2)

  const [pagination, setPagination] = useState({ current: 1, pageSize: itemsPerPageOptions[1] })
  const [sorters, setSorters] = useState({})
  const [filters, setFilters] = useState({})
  console.log(filters)
  // const [statusClickedId, setStatusClickedId] = useState('')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [{ response, loading: loadingFetch }] = useFetching(
    `/api/catalog/v1/products/variants/${baseProduct}?page=${pagination.current}&limit=${pagination.pageSize}&sortField=${sorters.sortField}&sortOrder=${sorters.sortOrder}`,
    {},
    refetch,
  )

  console.log('refetch', refetch)
  useEffect(() => {
    setLoading(loadingFetch)
  }, [loadingFetch])

  // const handleMenuClick = async e => {
  //   // console.log('clicked on', e.key, clickedId)
  //   const isUpdated = await editStatus(statusClickedId, e.key)
  //   if (isUpdated) {
  //     const recordIndex = products.findIndex(item => item._id === statusClickedId)
  //     products[recordIndex].status = e.key
  //     setProducts(products)
  //   }
  //   setStatusClickedId(null)
  // }

  // eslint-disable-next-line no-unused-vars
  const fetchProducts = async () => {
    // const prods = await getProducts({ itemsPerPage, currentPage, limit, sortField, sortOrder })
    setLoading(true)
    const prods = await getProducts()
    setLoading(false)
    if (prods && prods.length > 0) setProducts(prods)
  }

  console.log(products)

  useEffect(() => {
    if (response) {
      console.log(response)
      setProducts(response.data)
      setPagination(prev => ({ ...prev, total: response.total }))
    }
  }, [response])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  useDidMountEffect(() => {
    console.log('itemsPerPage changed;  need to fetch')
  }, [pagination.pageSize])

  // const handleDelete = async id => {
  //   const isDeleted = await deleteProduct(id)
  //   if (isDeleted) {
  //     setProducts(m => {
  //       const newData = m.filter(i => i._id !== id)
  //       return newData
  //     })
  //   }
  // }

  const setRowKey = record => {
    // console.log(record)
    return record._id
  }

  const handleTableChange = (params, filtersParam, sorter) => {
    console.log('handleTableChange params', params)
    console.log('handleTableChange filtersParam', filtersParam)
    console.log('handleTableChange sorter', sorter)

    const pager = { ...pagination }
    pager.current = params.current

    setPagination(pager)
    setSorters({ sortField: sorter.field, sortOrder: sorter.order })
    setFilters(filtersParam)
    // fetchProducts({
    //   page: pager.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // })
  }

  const handleItemsChange = a => {
    setPagination(prev => ({ ...prev, pageSize: Number(a) }))
  }

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  const columns = [
    // product_id date time
    // assets.thumbnail
    // sku
    // pricing.list_price
    // pricing.sale_price
    // status
    // action
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => `#${index + 1}`,
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
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) => a.featured - b.featured,
      render: text => (text ? 'Yes' : 'No'),
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
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',

      render: (_, record) => (record.brand && record.brand.name ? record.brand.name : ''),
    },
    {
      title: 'Price',
      dataIndex: 'pricing',
      key: 'price',
      render: (_, record) => (
        <div className="list-sale-price">
          <span>Rs {record.pricing ? record.pricing.salePrice : ''}</span>
          <span>Rs {record.pricing ? record.pricing.listPrice : ''}</span>
        </div>
      ),
    },
    // {
    //   title: 'List Price',
    //   dataIndex: 'pricing.listPrice',
    //   key: 'listPrice',
    //   render: text => <span>{`Rs ${text}`}</span>,
    //   sorter: (a, b) => a.pricing.listPrice - b.pricing.listPrice,
    // },
    // {
    //   title: 'Sale Price',
    //   dataIndex: 'pricing.salePrice',
    //   key: 'salePrice',
    //   render: text => <span>{`Rs ${text}`}</span>,
    //   sorter: (a, b) => a.pricing.salePrice - b.pricing.salePrice,
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'
        return (
          <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text.toUpperCase()}</span>
        )
      },
    },
  ]

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }

  return (
    <div>
      <Helmet title="Products List" />
      <div className="card">
        {/* {!loading && ( */}
        <div className="card-body">
          <SearchProvider columns={columns} select pagination>
            {columnsWithSearch => (
              <>
                {!loading && (
                  <div className="right-flex">
                    <span>
                      <strong>Items per page:&nbsp;</strong>
                    </span>
                    <Select value={Number(pagination.pageSize)} onChange={handleItemsChange}>
                      {itemsPerPageOptions.map(i => (
                        <Select.Option key={i}>{i}</Select.Option>
                      ))}
                    </Select>
                  </div>
                )}
                <Table
                  className="utils__scrollTable"
                  loading={loading}
                  scroll={scrollStyle}
                  pagination={pagination}
                  // rowSelection={rowSelection}
                  columns={columnsWithSearch}
                  dataSource={products}
                  rowKey={setRowKey}
                  onChange={handleTableChange}
                />
              </>
            )}
          </SearchProvider>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default VariantList
