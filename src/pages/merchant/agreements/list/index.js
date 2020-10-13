import React from 'react'
import { Button, Popconfirm } from 'antd'
import Table from 'components/Table'

const OrdersList = ({
  response,
  approveStatus,
  loading,
  editable = true,
  role,
  userId,
  onStatusChange,
  onDeleteFile,
}) => {
  console.log('thissasad', response)

  const handleDelete = (filename) => {
    const obj = {
      [`adminFilesDelete[]`]: filename,
      merchantId: userId,
    }
    console.log('obkect', obj)
    if (onDeleteFile) onDeleteFile(obj)
  }

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
            icon="eye"
            onClick={() => {
              window.open(record.path)
            }}
            type="primary"
            className="mr-1"
            size="small"
          />
          {/* <Button type="primary" className="mr-1" size="small">
            <i className="icmn icmn-checkmark2" />
          </Button> */}
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

  const actions = [
    {
      key: 'declinet',
      Component: <Button type="danger">Delete Selected</Button>,
      actionType: 'delete',
    },
  ]
  const handleStatus = async (status) => {
    console.log(status)
    const obj = {
      approveStatus: status,
      merchantId: userId,
    }
    if (onStatusChange) onStatusChange(obj)
  }
  const setRowKey = (record) => {
    return record.filename
  }

  return (
    <>
      {!editable && role === 'admin' && (
        <div className="pull-right" style={{ zIndex: 2, position: 'relative' }}>
          {approveStatus !== 'approve' && (
            <Button
              onClick={() => {
                handleStatus('approve')
              }}
              type="primary"
            >
              Approve All
            </Button>
          )}
          {approveStatus !== 'reject' && (
            <Button
              onClick={() => {
                handleStatus('reject')
              }}
              type="danger"
            >
              Reject ALL
            </Button>
          )}
        </div>
      )}
      <Table
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={columns}
        dataSource={response}
        loading={loading}
        actionButtons={actions}
        onActionClick={(w, a) => {
          console.log('aaalcik', w, a)
        }}
        rowKey={setRowKey}
      />
    </>
  )
}

export default OrdersList
