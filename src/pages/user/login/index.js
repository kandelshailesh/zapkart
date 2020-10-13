import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import actions from 'redux/user/actions'
// import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import styles from './style.module.scss'
// import config from '../../../config.json'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      console.log(error)
      if (!error) {
        dispatch({
          type: actions.LOGIN,
          payload: values,
        })
      }
    })
  }

  onClick = e => {
    e.preventDefault()
  }

  responseGoogle = response => {
    console.log(' received google response')
    const { dispatch } = this.props
    const { accessToken, profileObj } = response
    console.log(accessToken, response)
    const { name, email, imageUrl, googleId } = profileObj
    console.log(accessToken, name, email, imageUrl, googleId)
    dispatch({
      type: 'user/LOGIN_SOCIAL',
      payload: {
        name,
        email,
        imageUrl,
        googleId,
        accessToken,
      },
    })
  }

  render() {
    const {
      form,
      user: { fetching },
    } = this.props
    return (
      <div>
        <Helmet title="Login" />
        <div className={`${styles.title} login-heading`}>
          <h1>
            <strong>WELCOME</strong>
          </h1>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>Please log in</strong>
                  </h4>
                  {/* <span className='ml-3 register-link'>
                    <a
                      href='#'
                      className='text-primary utils__link--underlined pull-right'
                    >
                      Seller? Click here
                    </a>{' '}
                  </span> */}
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="Email">
                      {form.getFieldDecorator('email', {
                        // initialValue: 'admin@mediatec.org',
                        initialValue: 'admin@gmail.com',
                        rules: [
                          {
                            required: true,
                            message: 'Please input your e-mail address',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {form.getFieldDecorator('password', {
                        // initialValue: 'cleanui',
                        initialValue: 'admin',
                        rules: [
                          {
                            required: true,
                            message: 'Please input your password',
                          },
                        ],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <Form.Item>
                      {form.getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox>Remember me</Checkbox>)}
                      {/* <Link
                        to="/user/forgot"
                        className="utils__link--blue utils__link--underlined pull-right"
                      >
                        Forgot password?
                      </Link> */}
                    </Form.Item>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Login
                      </Button>
                      {/* <span className="ml-3 register-link">
                        <a
                          href="#"
                          onClick={this.omClick}
                          className="text-primary utils__link--underlined"
                        >
                          Register
                        </a>{' '}
                        if you don&#39;t have account
                      </span> */}
                    </div>
                    {/* <div className="form-group">
                      <p>Use another service to Log In</p>
                      <div className="mt-2">
                         <a
                          href='#'
                          className='btn btn-icon mr-2'
                        >
                          <i className='icmn-facebook' />
                        </a> 
                        {/* <a
                          href='#'
                          className='btn btn-icon mr-2'
                        >
                          <i className='icmn-google' />
                        </a> 
                     <GoogleLogin
                          clientId={config.GOOGLE_CLIENT_ID}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy="single_host_origin"
                        /> 
                    <a
                          href='#'
                          className='btn btn-icon mr-2'
                        >
                          <i className='icmn-windows' />
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon mr-2'
                        >
                          <i className='icmn-twitter' />
                        </a> 
                      </div>
                    </div> */}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
