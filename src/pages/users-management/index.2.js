import React from 'react'
import { Skeleton } from 'antd'
import UserCard from 'components/CleanUIComponents/UserCard'
import usersJSON from './data.json'

class Users extends React.Component {
  state = {
    users: '',
    loading: true
  }

  componentDidMount () {
    this.setState({
      users: usersJSON.data,
      loading: false
    })
  }

  render () {
    const { loading, users } = this.state
    if (loading) {
      return (
        <div className='card'>
          <div className='card-body'>
            <Skeleton loading={loading} active avatar paragraph={{ rows: 3 }} />
          </div>
        </div>
      )
    }
    return <UserCard user={users} />
  }
}

export default Users
