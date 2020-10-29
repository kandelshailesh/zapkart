import React from 'react'
import { Tooltip, Icon, Popconfirm, Button } from 'antd'
import { Link } from 'react-router-dom'

const AddNew = ({
  link,
  selectedRowKeys = 0,
  attribute = '',
  handleDelete,
  add,
  onClick,
  onRemove,
  pullRight = true,
}) => {
  const handleOnClick = () => {
    if (onClick) onClick()
  }
  return (
    <div className={pullRight ? 'pull-right' : ''}>
      {add && (
        <Tooltip placement="topLeft" title={`Add new ${attribute}`}>
          {link && (
            <Link to={link}>
              <Icon type="plus-circle" theme="filled" style={{ fontSize: '30px' }} />
            </Link>
          )}
          {!link && (
            <Button onClick={handleOnClick} className="border-0">
              <Icon type="plus-circle" theme="filled" style={{ fontSize: '30px' }} />
            </Button>
          )}
        </Tooltip>
      )}
      {onRemove && (
        <Tooltip placement="topLeft" title={`Remove ${attribute}`}>
          {link && (
            <Link to={link}>
              <Icon type="minus-circle" theme="filled" style={{ fontSize: '30px', color: 'red' }} />
            </Link>
          )}
          {!link && (
            <Button onClick={onRemove} className="border-0">
              <Icon type="minus-circle" theme="filled" style={{ fontSize: '30px', color: 'red' }} />
            </Button>
          )}
        </Tooltip>
      )}
      {selectedRowKeys.length > 0 && (
        <Tooltip
          placement="bottomRight"
          title={selectedRowKeys.length === 1 ? `Delete ${attribute}` : `Delete ${attribute}s`}
        >
          <Popconfirm
            title={`Delete ${selectedRowKeys.length} ${
              selectedRowKeys.length === 1 ? `${attribute}` : `${attribute}s`
            }`}
            onConfirm={() => handleDelete()}
          >
            {/* <Button type='link'> */}
            <Icon theme="filled" type="delete" style={{ fontSize: '30px' }} />
            {/* </Button> */}
          </Popconfirm>
        </Tooltip>
      )}
    </div>
  )
}

export default AddNew
