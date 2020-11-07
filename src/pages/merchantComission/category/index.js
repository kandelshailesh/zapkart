/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Icon, Dropdown, notification, Table, Modal } from 'antd'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { editData } from 'services'
import { API_COMMISSION_CATAGORY } from '_constants'
import { connect } from 'react-redux'
import { reducer, initialState } from './reducer'
import Form from './add-edit'

const menuItems = [
  {
    key: 'pending',
    title: 'Pending',
  },
  {
    key: 'processe',
    title: 'Processe',
  },
  {
    key: 'approve',
    title: 'Approve',
  },
]

const Zone = ({ user, match }) => {
  const { params } = match
  const { type } = params
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);
  const URL = `${API_COMMISSION_CATAGORY.list}?type=${type}`

  const [isModaal, setModal] = useState(false)
  const [selected, setselected] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state.searchQuery)

  const [{ response, loading, error }] = useFetching(URL)

  const handleMenuClick = async (e) => {
    if (state.statusClickedId) {
      const res = await editData(
        `${URL}/${state.statusClickedId}`,
        {
          approvestatus: e.key,
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
      console.log(response)
      dispatch({
        type: 'setData',
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

  // const handleDelete = (id) => {
  //   return async () => {
  //     const isDeleted = await deleteData(`${URL}/${id}`)
  //     if (isDeleted) {
  //       dispatch({
  //         type: 'deleteItem',
  //         payload: id,
  //       })
  //     }
  //   }
  // }

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

  const columns = [
    //     approvestatus: "approve"
    // commission: 4
    // deleted: false
    // merchant: {id: 99, firstName: "riolabz", lastName: "riolabz", email: "riolabz@gmail.com", phone: "1234567898"}
    // merchentId: 99
    // type: "brand"
    // _id: "5fa534bc74671d75feed7bd1"

    {
      title: 'Merchent',
      dataIndex: 'merchentId',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
    },
    // {
    //   title: 'Type Detail',
    //   dataIndex: 'typedetail',
    // },
    {
      title: 'Approve status',
      dataIndex: 'approvestatus',
      key: 'approvestatus',
      render: (text, record) => {
        if (user.userTypeId === 1) {
          let badge = 'badge-danger'
          if (record.approvestatus === 'approve') badge = 'badge-success'
          if (record.approvestatus === 'processe') badge = 'badge-warning'
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
                {text}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        }
        let badge = 'badge-danger'
        if (record.approvestatus === 'approve') badge = 'badge-success'
        if (record.approvestatus === 'processe') badge = 'badge-warning'
        return <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text}</span>
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
      render: (record) =>
        user.userTypeId === 1 && (
          <span>
            <Button
              icon="edit"
              className="mr-1"
              size="small"
              onClick={() => {
                setModal(true)
                setselected(record._id)
              }}
            />
            {/* {state.data.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record._id)}>
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null} */}
          </span>
        ),
    },
  ]

  return (
    <div>
      <Helmet title="List" />
      <Modal footer onCancel={() => setModal(false)} onOk visible={isModaal}>
        <Form id={selected} onResponse={() => setModal(false)} />
      </Modal>
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>List</strong>
            <AddNew add attribute="commission" onClick={() => setModal(true)} />
          </div>
        </div>
        <div className="card-body">
          <Table loading={loading} columns={columns} dataSource={state.data} rowKey={setRowKey} />
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Zone)
