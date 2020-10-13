/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Skeleton, Table, Button, Popconfirm, notification } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import SearchProvider from 'components/RenderProps/SearchProvider'
import useFetching from 'hooks/useFetching'
import { editMerchant } from 'services/merchants'
import { STRINGS } from '_constants'

const scrollStyle = { x: '100%' }

const Merchants = props => {
  console.log('yyyyyyy', props)
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [merchants, setMerchants] = useState([])
  const [{ response, loading, error }] = useFetching('/api/backend/v1/merchant')

  console.log('mmmm', merchants)

  useEffect(() => {
    if (response) setMerchants(response.data)
  }, [response])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = React.useCallback(id => {
    console.log('bbb', id)
    return async () => {
      const a = await editMerchant({ deleted: 'true' }, id)
      if (a) {
        notification.success({
          message: STRINGS.success,
          description: STRINGS.deleteSuccess,
        })
        setMerchants(prev => prev.filter(i => i.id !== id))
      }
    }
    // setResponse({});
  }, [])

  const setRowKey = record => {
    console.log(record)
    return record.id
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Link className="utils__link--underlined" to={`/merchant/edit/${record.id}`}>
          {text}
        </Link>
      ),
      search: true,
    },
    {
      title: 'Reg No',
      dataIndex: 'regnumber',
      key: 'regNumber',
      render: text => <span>{`${text}`}</span>,
      sorter: (a, b) => a.regnumber - b.regnumber,
    },
    {
      title: 'Commission Slab',
      dataIndex: 'commissionslab',
      key: 'commissionSlab',
      render: text => <span>{`Rs ${text}`}</span>,
      sorter: (a, b) => a.commissionslab - b.commissionslab,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => {
        if (a.status === b.status) return 0
        if (a.status) return -1
        return 1
      },
      render: text => (
        <span className={`badge ${text === 'active' ? 'badge-success' : 'badge-danger'}`}>
          {text}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <Link to={`/merchant/edit/${record.id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          {merchants.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record.id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  if (error) {
    notification.error({ error: 'Error!', message: error.message })
    // history.goBack();
    // return '';
  }

  const addMerchant = '/merchant/create'
  return (
    <div>
      <Helmet title="Merchant List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Merchant List</strong>
            <AddNew
              add
              // selectedRowKeys={selectedRowKeys}
              handleDelete={handleDelete}
              attribute="merchant"
              link={addMerchant}
            />
          </div>
        </div>
        {loading && (
          <div className="card-body">
            <Skeleton active />
          </div>
        )}
        {!loading && (
          <div className="card-body">
            <SearchProvider columns={columns} select>
              {columnsWithSearch => (
                <Table
                  className="utils__scrollTable"
                  scroll={scrollStyle}
                  // rowSelection={rowSelection}
                  columns={columnsWithSearch}
                  dataSource={merchants}
                  rowKey={setRowKey}
                />
              )}
            </SearchProvider>
          </div>
        )}
      </div>
    </div>
  )
}

export default Merchants
