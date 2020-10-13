import React from 'react'
import UserCard from 'components/CleanUIComponents/UserCard'
import InfoCard from 'components/InfoCard'
import { Descriptions } from 'antd'
import { getFormattedDate, getFormattedTime } from 'utils'
// import { user } from './data.json'

const UserInfo = ({ user }) => {
  const userCardProp = {
    avatar: user.avatarlocation,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    phone: user.phone,
  }
  const { orders, wishlist, reviews } = user
  const ordersStats = { count: orders ? orders.length : 0, title: 'Orders' }
  const reviewsStats = { count: orders ? reviews.count : 0, title: 'Reviews' }
  const wishlistStats = {
    count: wishlist && wishlist.products ? wishlist.products.length : 0,
    title: 'Wishlist',
  }

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-5 col-md-5">
            <UserCard user={userCardProp} />
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <InfoCard form="stats" icon="database" type="primary" stats={ordersStats} />
                {/* <InfoCard form="stats" icon="users" type="empty" /> */}
              </div>
              <div className="col-lg-4 col-sm-12">
                <InfoCard form="stats" icon="bullhorn" type="success" stats={reviewsStats} />
                {/* <InfoCard form="stats" icon="price-tags" type="empty" /> */}
              </div>
              <div className="col-lg-4 col-sm-12">
                <InfoCard form="stats" icon="bullhorn" type="empty" stats={wishlistStats} />
                {/* <InfoCard form="stats" icon="price-tags" type="empty" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Descriptions column={1} className="descr-info">
          <Descriptions.Item label="Last Login">
            {`${getFormattedDate(user.lastLoginAt)} ${getFormattedTime(user.lastLoginAt)}`}
          </Descriptions.Item>
          <Descriptions.Item label="Current account status">
            {/* {user.current_ac_status} */}
            Registered
          </Descriptions.Item>
          <Descriptions.Item label="Signup date">
            {`${getFormattedDate(user.createdAt)} ${getFormattedTime(user.createdAt)}`}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Newsletter signup status">
            {user.newsletter_signup_status} 
  </Descriptions.Item> */}
          <Descriptions.Item label="Usergroup">-</Descriptions.Item>
          {/* <Descriptions.Item label="Profile language">{user.profile_language}</Descriptions.Item> */}
        </Descriptions>
      </div>
    </div>
  )
}

UserInfo.defaultProps = {
  user: {},
}

export default UserInfo
