import { Helmet } from 'react-helmet'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL } from '_constants'
import React, { useEffect, useReducer } from 'react'
import { Icon, Dropdown, notification, Table } from 'antd'
import Menu from 'components/Menu'
import { editData } from 'services'
import { reducer, initialState } from './reducer'

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

const RewardList = ({ userID }) => {
  const [{ response, loading, error }] = useFetching(`${CATALOG_API_URL.getUserRewards}/${userID}`)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleMenuClick = async (e) => {
    if (state.statusClickedId) {
      const res = await editData(
        `${URL}/${state.statusClickedId}`,
        {
          status: e.key,
        },
        'json',
      )
      if (res?.success) {
        dispatch({
          type: 'updateClickedProdStatus',
          payload: e.key,
        })
      }
      dispatch({
        type: 'clearStatusClickedId',
      })
    }
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response && response.data) {
      dispatch({
        type: 'setData',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
    if (error) {
      dispatch({
        type: 'clearData',
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

  const setRowKey = (record) => {
    // console.log(record)
    return record.id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

  const columns = [
    {
      title: 'Order ID.',
      dataIndex: 'orderid',
      key: 'orderid',
    },
    {
      title: 'Customer Name',
      dataIndex: 'purchase_user',
      key: 'purchase_user',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
            // visible={this.state.clickedId === record.id}
            overlay={menu}
            // ref={this.clickId}
            id={record.id}
            onClick={() => handleStatusClick(record.id)}
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
  ]

  return (
    <div>
      <Helmet title="Countries List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Reward history</strong>
            <div>
              <h6>Total Rewards</h6>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            loading={loading}
            columns={columns}
            dataSource={state.data.history}
            rowKey={setRowKey}
          />
        </div>
      </div>
    </div>
  )
}

export default RewardList
