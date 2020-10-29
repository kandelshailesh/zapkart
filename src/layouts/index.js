import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'
import { ROLES } from '_constants'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'
// import Loader from 'components/LayoutComponents/Loader'

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class IndexLayout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'login'
      }
      return 'main'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized = user.authorized
    const userRole = user.role
    const isUserLoading = user.loading
    const isLoginLayout = getLayout() === 'login'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized && user.role === ROLES.admin) {
        console.log('redirecting to alpha dash')
        return <Redirect to="/dashboard" />
      }
      if (isLoginLayout && isUserAuthorized && user.role === ROLES.merchant) {
        console.log('redirecting to seller dash')
        return <Redirect to="/dashboard/seller" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate={`Zapkart ${userRole}`} title={`Zapkart ${userRole}`} />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default IndexLayout
