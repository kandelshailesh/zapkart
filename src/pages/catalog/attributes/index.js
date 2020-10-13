/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Table, Button, Popconfirm, Dropdown, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import { LINKS } from '_constants'
import { getAttributeGroups, deleteAttributeGroup, editAttrGrpStatus } from 'services/attributes'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'

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
class AttributesList extends React.Component {
  state = {
    data: [],
    loading: false,
  }

  componentDidMount() {
    this.fetchAttributes()
  }

  fetchAttributes = async () => {
    this.setState({ loading: true })
    const res = await getAttributeGroups()
    console.log(res)
    if (res) this.setState({ data: res.data, loading: false })
    else this.setState({ loading: false })
  }

  handleDelete = _id => {
    this.fetchDelete(_id)
  }

  fetchDelete = async id => {
    const a = await deleteAttributeGroup(id)
    if (a) {
      this.setState(prevState => {
        const updatedData = prevState.data.filter(item => item._id !== id)
        return {
          ...prevState,
          data: updatedData,
        }
      })
    }
  }

  handleMenuClick = async e => {
    const { clickedId, data } = this.state
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editAttrGrpStatus(clickedId, e.key)
    if (isUpdated) {
      const recordIndex = data.findIndex(item => item._id === clickedId)
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

  render() {
    const { data, loading } = this.state

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Attribute Group',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text, record) => <Link to={`${LINKS.editAttribute}/${record._id}`}>{text}</Link>,
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
              id={record._id}
              onClick={() => this.handleStatusClick(record._id)}
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
        render: record => (
          <span>
            <Link to={`${LINKS.editAttribute}/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>

            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          </span>
        ),
      },
    ]

    // if (loading) return <Skeleton active />
    return (
      <div>
        <Helmet title="Attributes List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Attributes List</strong>
              <AddNew add link={LINKS.addAttribute} attribute="attribute" />
            </div>
          </div>

          <div className="card-body">
            <FilterProvider columns={columns} data={data}>
              {filteredData => (
                <Table
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  // scroll={{ x: true }}
                  rowKey={record => record._id}
                  columns={columns.map(i => omit(i, ['filters']))}
                  dataSource={filteredData}
                  loading={loading}
                />
              )}
            </FilterProvider>
          </div>
        </div>
      </div>
    )
  }
}

export default AttributesList
