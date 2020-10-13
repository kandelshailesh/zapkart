import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { notification } from 'antd'

@connect(({ user }) => ({ user }))
class Authorize extends React.Component {
  render() {
    const { user, roles = [], children, redirect = false, to = '/404' } = this.props // current user role
    const { role } = user
    
    console.log('', user, roles)
    console.log('in Authorize')
    const authorized = roles.includes(role)
    console.log('authorized redirect role')
    console.log(authorized, redirect, role, roles)
    const AuthorizedChildren = () => {
      // if user not equal needed role and if component is a page - make redirect to needed route
      if (!authorized && redirect) {
        // notification.error({
        //   message: 'Unauthorized Access',
        //   description: `You have no rights to access this page! ${authorized}, ${redirect}, ${role}`,
        // })
        return <Redirect to={to} />
      }
      // if user not authorized return null to component
      if (!authorized) {
        return null
      }
      // if access is successful render children
      return <div>{children}</div>
    }
    return AuthorizedChildren()
  }
}

export default Authorize
