/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Icon, Input,
  Button,
  notification,
  Skeleton,
  Dropdown,
  Icon,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getuserGroup, edituserGroup } from 'services/usergroups'
import { STRINGS, ROLES } from '_constants'
// import styles from './style.module.scss'

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

const addUserGroup = '/userGroup/create'

class UserGroupList extends React.Component {
  state = {
    // tableData: [],
    data: [],
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    loading: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true })
    const data = await getuserGroup(ROLES.enduser)
    if (data && data.length > 0) this.setState({ loading: false, data })
    else {
      this.setState({ loading: false })
      notification.warning({
        message: 'No User Group',
      })
    }
  }

  handleMenuClick = async e => {
    const { clickedId, data } = this.state
    console.log('clicked on', e.key, clickedId)
    const isUpdated = await edituserGroup(clickedId, { status: e.key })
    if (isUpdated) {
      const recordIndex = data.findIndex(item => item.id === clickedId)
      data[recordIndex].status = e.key
      return this.setState(prev => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = id => {
    this.setState({ clickedId: id })
  }

  handleDelete = async id => {
    const a = await await edituserGroup(id, { deleted: 'true' })
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      this.setState(prev => {
        const newData = prev.data.filter(i => i.id !== id)
        return {
          ...prev,
          data: [...newData],
        }
      })
    }
  }

  render() {
    const {
      loading,
      data,
      // searchText, filtered, filterDropdownVisible
    } = this.state

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        search: true,
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
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id)}
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

      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`/userGroup/edit/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            <Button icon="close" onClick={() => this.handleDelete(record.id)} size="small" />
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="UserGroup List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>UserGroup List</strong>
              <AddNew add link={addUserGroup} attribute="usergroup" />
            </div>
          </div>

          <div className="card-body">
            {loading && (
              <div className="card-body">
                <Skeleton active />
              </div>
            )}
            {!loading && (
              <SearchProvider columns={columns}>
                {columnsWithSearch => (
                  <Table
                    className="utils__scrollTable"
                    scroll={{ x: '100%' }}
                    rowKey={record => record.id}
                    columns={columnsWithSearch}
                    dataSource={data}
                  />
                )}
              </SearchProvider>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default UserGroupList
