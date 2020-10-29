import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import Query from 'components/Query'
import ReviewsList from 'pages/reviews'
import { CATALOG_API_URL } from '_constants'
import UserInfo from './UserInfo'
// import AddressInfo from './AddressInfo'
import UserOrdersList from './UserOrdersList'
import UserWishlist from './UserWishlist'

const { TabPane } = Tabs

const Details = (props) => {
  const { settings } = props
  const { isMobileView } = settings

  const { match } = props
  const { params } = match
  const { userId } = params

  return (
    <div>
      <Helmet title="User Details" />
      <div className="card">
        <Query
          url={`${CATALOG_API_URL.users}/${userId}?orders=true&reviews=true&wishlist=true`}
          goBackText="Go back to user list"
          to="/users-management/list"
        >
          {(response) => {
            if (response && response.user) {
              const { user } = response

              return (
                <>
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>User details</strong>
                    </div>
                  </div>
                  <div className="card-body min-height-700">
                    <Tabs tabPosition={isMobileView ? 'top' : 'left'}>
                      <TabPane key="a" tab="Customer info">
                        <UserInfo user={user} />
                      </TabPane>
                      {/* <TabPane key="b" tab="Address Info">
                        <AddressInfo />
                      </TabPane> */}
                      <TabPane key="c" tab="Orders">
                        <UserOrdersList userId={user ? user.id : null} />
                      </TabPane>
                      <TabPane key="d" tab="WishList">
                        <UserWishlist userId={user ? user.id : null} />
                      </TabPane>
                      <TabPane key="e" tab="Product reviews">
                        <ReviewsList userId={userId} />
                      </TabPane>
                    </Tabs>
                  </div>
                </>
              )
            }
            return null
          }}
        </Query>
      </div>
    </div>
  )
}

export default connect(({ settings, user }) => ({ settings, user }))(Details)
