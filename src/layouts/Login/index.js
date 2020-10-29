import React from 'react'
// import { Layout, Button } from 'antd'
import { Layout } from 'antd'
// import { Link, withRouter } from 'react-router-dom'
import { withRouter, Link } from 'react-router-dom'
import styles from './style.module.scss'

@withRouter
class LoginLayout extends React.PureComponent {
  state = {
    backgroundNumber: 1,
    // backgroundEnabled: false,
  }

  // changeBackground = () => {
  //   const { backgroundNumber } = this.state
  //   this.setState({
  //     backgroundEnabled: true,
  //     backgroundNumber: backgroundNumber === 5 ? 1 : backgroundNumber + 1,
  //   })
  // }

  // toggleBackground = () => {
  //   const { backgroundEnabled } = this.state
  //   this.setState({
  //     backgroundEnabled: !backgroundEnabled,
  //   })
  // }

  render() {
    const { children } = this.props
    const { backgroundNumber } = this.state

    return (
      <Layout>
        <Layout.Content>
          <div
            className={`${styles.layout} ${styles.light}`}
            style={{
              backgroundImage: `url('resources/images/photos/${backgroundNumber}.jpeg')`,
            }}
          >
            <div className={styles.header}>
              {/* <div className={styles.logo}>
                <Link to="/">
                  {!backgroundEnabled && (
                    <img src="resources/images/logo.png" alt="Clean UI React Admin Template" />
                  )}
                  {backgroundEnabled && (
                    <img
                      src="resources/images/logo-inverse.png"
                      alt="Clean UI React Admin Template"
                    />
                  )}
                </Link>
              </div> */}
              {/* <div className={styles.controls}>
                <div className="d-inline-block mr-3">
                  <Button type="default" onClick={this.changeBackground}>
                    Change Background
                  </Button>
                </div>
                <div className="d-inline-block">
                  <Button type="default" onClick={this.toggleBackground}>
                    Toggle Background
                  </Button>
                </div>
              </div> */}
              <nav className={styles.navigation}>
                <ul className={styles.navigationItems}>
                  <li>
                    <Link to="/">&larr; Popolr Admin Home</Link>
                  </li>
                  <li>
                    <Link className={styles.navigationActive} to="/">
                      Login
                    </Link>
                  </li>
                  {/* <li>
                    <Link to='/'>About</Link>
                  </li>
                  <li>
                    <Link to='/'>Support</Link>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={`${styles.footer} text-center`}>
              {/* <ul className="list-unstyled list-inline mb-3">
                <li className="list-inline-item">
                  <Link to='/'>Terms of Use</Link>
                </li>
                <li className="active list-inline-item">
                  <Link to='/'>Compliance</Link>
                </li>
                <li className="list-inline-item">
                  <Link to='/'>Confidential Information</Link>
                </li>
                <li className="list-inline-item">
                  <Link to='/'>Support</Link>
                </li>
                <li className="list-inline-item">
                  <Link to='/'>Contacts</Link>
                </li>
              </ul> */}
              <p>&copy; 2020 Riolabz. All rights reserved.</p>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default LoginLayout
