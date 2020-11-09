import React from 'react'
import { Button, Popconfirm } from 'antd'
import Table from 'components/Table'
import { deleteMerchantAgreement } from 'services/merchantAgreement'

const OrdersList = ({ response, approveStatus, loading, editable = true, role, ondelete }) => {
  const columns = [
    {
      title: 'filename',
      dataIndex: 'originalname',
      key: 'originalname',
    },
    {
      title: editable ? '' : 'Approve Status',
      key: editable ? '' : 'approveStatus',
      render: editable ? '' : () => <span>{approveStatus}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            icon="check"
            onClick={() => {
              // window.open(record.path)
            }}
            type="primary"
            className="mr-1"
            size="small"
          />
          <Button
            icon="eye"
            onClick={() => {
              window.open(record.path)
            }}
            type="primary"
            className="mr-1"
            size="small"
          />
          {editable && (
            <Popconfirm
              placement="topLeft"
              title="Delete This Document?"
              onConfirm={() => {
                handleDelete(record.filename)
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button icon="close" type="danger" className="mr-1" size="small" />
            </Popconfirm>
          )}
        </>
      ),
    },
  ]
  const handleDelete = async (file) => {
    const success = await deleteMerchantAgreement({ [`merchantFilesDeleted[]`]: file })
    if (success) {
      ondelete()
    }
  }

  const actions = [
    {
      key: 'accept',
      Component: <Button type="danger">Delete Selected</Button>,
      actionType: 'delete',
    },
    // {
    //   key: 'declinet',
    //   Component: <Button type="danger">Decline Selected</Button>,
    //   actionType: 'delete',
    // },
  ]
  const setRowKey = (record) => {
    return record.filename
  }

  return (
    <>
      {!editable && role === 'admin' && (
        <div className="pull-right" style={{ zIndex: 2, position: 'relative' }}>
          <Button onClick type="primary">
            Approve
          </Button>
        </div>
      )}
      <Table
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={columns}
        dataSource={response}
        loading={loading}
        actionButtons={editable ? actions : []}
        onActionClick={(w, a) => {
          console.log('aaalcik', w, a)
        }}
        rowKey={setRowKey}
      />
    </>
  )
}

export default OrdersList
