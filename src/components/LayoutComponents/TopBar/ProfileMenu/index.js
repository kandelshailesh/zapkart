import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { FormattedMessage } from 'react-intl'
import Link from 'react-router-dom/Link'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.PureComponent {
  state = {
    count: 7,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  addCount = () => {
    let { count } = this.state
    count += 1
    this.setState({
      count,
    })
  }

  render() {
    const { user } = this.props
    const firstName = `${
      typeof user.firstName !== 'undefined' && user.firstName !== 'undefined'
        ? user.firstName
        : 'Admin'
    }`
    const lastName = `${
      typeof user.lastName !== 'undefined' && user.lastName !== 'undefined' ? user.lastName : ''
    }`
    const name = `${firstName} ${lastName} `
    console.log(user)
    const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {name}
          </strong>
          {/* <div>
            <strong className="mr-1">
              <FormattedMessage id="topBar.profileMenu.billingPlan" />:{' '}
            </strong>
            Professional
          </div> */}
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            <strong className="text-capitalize">{user.role}</strong>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{' '}
            </strong>
            {user.email}
            {/* <br />
            <strong>
              <FormattedMessage id="topBar.profileMenu.phone" />:{' '}
            </strong>
            {user.phone || '-'} */}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to="/edit-profile">
            <i className={`${styles.menuIcon} icmn-user`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={this.logout}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
